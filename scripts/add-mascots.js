const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} blog files`);

// Helper to determine mascot based on heading text
function getMascotForHeading(heading) {
  const lower = heading.toLowerCase();
  if (lower.includes('경고') || lower.includes('주의') || lower.includes('위험') || lower.includes('danger') || lower.includes('warning')) {
    return '/mascot/sm/emotion/cat_worried.png';
  }
  if (lower.includes('결과') || lower.includes('성공') || lower.includes('좋은 소식') || lower.includes('성공') || lower.includes('해결') || lower.includes('해결책')) {
    return '/mascot/sm/emotion/cat_happy.png';
  }
  if (lower.includes('분석') || lower.includes('설명') || lower.includes('방법') || lower.includes('가이드') || lower.includes('방법')) {
    return '/mascot/sm/emotion/cat_thinking.png';
  }
  if (lower.includes('놀라움') || lower.includes('놀라운') || lower.includes('惊讶') || lower.includes('amazing') || lower.includes('surprising')) {
    return '/mascot/sm/emotion/cat_surprised.png';
  }
  if (lower.includes('마무리') || lower.includes('결론') || lower.includes('cta') || lower.includes('행동') || lower.includes('문의') || lower.includes('상담')) {
    return '/mascot/sm/emotion/cat_grateful.png';
  }
  // default
  return '/mascot/sm/emotion/cat_cheer.png';
}

// Determine number of images based on content length
function getImageCount(contentLength) {
  if (contentLength >= 2000) {
    return 4; // between 3-5
  } else if (contentLength >= 1500) {
    return 2; // between 2-3
  } else if (contentLength >= 1000) {
    return 1;
  } else {
    return 0;
  }
}

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Split frontmatter and rest
  let frontmatter = '';
  let markdownContent = '';
  let inFrontmatter = false;
  let frontmatterLines = 0;
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') {
      frontmatterLines++;
      if (frontmatterLines === 2) {
        // end of frontmatter
        markdownContent = lines.slice(i + 1).join('\n');
        break;
      }
      continue;
    }
    if (frontmatterLines < 2) {
      frontmatter += line + '\n';
    }
  }
  // If frontmatter not found properly, assume no frontmatter
  if (frontmatterLines < 2) {
    frontmatter = '';
    markdownContent = content;
  }

  const contentLength = markdownContent.length;
  const imageCount = getImageCount(contentLength);
  console.log(`${file}: content length ${contentLength}, images to add: ${imageCount}`);

  if (imageCount === 0) {
    return;
  }

  // Find insertion points: after each H2 heading (line starting with '## ')
  const contentLines = markdownContent.split('\n');
  const insertionIndices = [];
  for (let i = 0; i < contentLines.length; i++) {
    if (contentLines[i].trim().startsWith('## ')) {
      insertionIndices.push(i); // insert after this line
    }
  }

  // If we don't have enough H2 headings, we can also consider inserting after paragraphs? 
  // For simplicity, we'll just use H2 headings. If not enough, we'll insert at end.
  let insertAt = [];
  for (let idx of insertionIndices) {
    if (insertAt.length >= imageCount) break;
    insertAt.push(idx);
  }
  // If still not enough, add at end of content
  if (insertAt.length < imageCount) {
    for (let i = 0; i < imageCount - insertAt.length; i++) {
      insertAt.push(contentLines.length); // insert at end
    }
  }

  // Sort insertion indices descending so that inserting later doesn't affect earlier indices
  insertAt.sort((a, b) => b - a);

  // For each insertion point, we need to know the heading text to choose mascot
  // We'll map insertion index to heading line
  const insertions = [];
  for (let idx of insertAt) {
    let headingLine = '';
    if (idx >= 0 && idx < contentLines.length) {
      headingLine = contentLines[idx];
    }
    // If idx is at end, we'll use a default heading? We'll just use last heading or default.
    const mascot = getMascotForHeading(headingLine);
    insertions.push({ index: idx, mascot });
  }

  // Insert the mascot lines
  for (let { index, mascot } of insertions) {
    // We want to insert after the line at index, so at position index+1
    const lineToInsert = `![right](${mascot})`;
    contentLines.splice(index + 1, 0, lineToInsert);
  }

  // Rebuild markdown content
  markdownContent = contentLines.join('\n');

  // Rebuild full content
  let newContent = frontmatter;
  if (frontmatter && !frontmatter.endsWith('---\n')) {
    newContent += '---\n';
  }
  newContent += markdownContent;

  // Write back
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  Updated ${file}`);
});

console.log('Processing complete.');

// Now run build to check for errors
const { execSync } = require('child_process');
try {
  console.log('Running npm run build...');
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('Build succeeded.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
