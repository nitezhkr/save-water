export interface PledgeCardData {
  userName: string;
  guardianTitle: string;
  pledgeNumber: number | string;
  dateStr?: string;
  commitments?: string[];
  websiteUrl?: string;
}

/**
 * Draws a high-resolution, certificate-grade Water Pledge Card onto a canvas (1200 x 675, 16:9).
 */
export function drawPledgeCard(canvas: HTMLCanvasElement, data: PledgeCardData): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  const name = (data.userName && data.userName.trim()) || 'Alex Morgan';
  const title = (data.guardianTitle && data.guardianTitle.trim()) || 'Earth Guardian 2050';
  const pledgeNum = typeof data.pledgeNumber === 'number'
    ? data.pledgeNumber.toLocaleString()
    : data.pledgeNumber || '1,248,321';

  // Format date
  const dateText = data.dateStr || new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();

  const website = data.websiteUrl || (typeof window !== 'undefined' ? window.location.host : 'everydrop.earth') || 'everydrop.earth';

  // 1. BASE BACKGROUND: Deep cosmic oceanic gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#020813');
  bgGrad.addColorStop(0.35, '#04172e');
  bgGrad.addColorStop(0.7, '#031224');
  bgGrad.addColorStop(1, '#010915');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. AMBIENT ATMOSPHERIC WATER GLOWS
  // Top-Right Cyan Nebula Glow
  const glowTR = ctx.createRadialGradient(width - 150, 100, 20, width - 150, 100, 420);
  glowTR.addColorStop(0, 'rgba(34, 211, 238, 0.16)');
  glowTR.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
  glowTR.addColorStop(1, 'rgba(2, 8, 19, 0)');
  ctx.fillStyle = glowTR;
  ctx.fillRect(0, 0, width, height);

  // Bottom-Left Teal Aquatic Glow
  const glowBL = ctx.createRadialGradient(150, height - 100, 20, 150, height - 100, 380);
  glowBL.addColorStop(0, 'rgba(45, 212, 191, 0.14)');
  glowBL.addColorStop(0.5, 'rgba(20, 184, 166, 0.06)');
  glowBL.addColorStop(1, 'rgba(2, 8, 19, 0)');
  ctx.fillStyle = glowBL;
  ctx.fillRect(0, 0, width, height);

  // Center subtle illumination
  const glowCenter = ctx.createRadialGradient(width / 2, 280, 50, width / 2, 280, 450);
  glowCenter.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
  glowCenter.addColorStop(1, 'rgba(2, 8, 19, 0)');
  ctx.fillStyle = glowCenter;
  ctx.fillRect(0, 0, width, height);

  // 3. SUBTLE WATER DROPLET WATERMARK (in background behind name)
  ctx.save();
  ctx.translate(width / 2, 280);
  ctx.fillStyle = 'rgba(34, 211, 238, 0.035)';
  ctx.beginPath();
  // Large droplet silhouette
  ctx.moveTo(0, -110);
  ctx.bezierCurveTo(45, -40, 95, 30, 95, 80);
  ctx.arc(0, 80, 95, 0, Math.PI);
  ctx.bezierCurveTo(-95, 30, -45, -40, 0, -110);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Helper: Rounded Rectangle
  const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  // 4. CERTIFICATE FRAMES (Double hairline Guilloche border)
  // Outer Border
  ctx.save();
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.25)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(22, 22, width - 44, height - 44, 20);
  ctx.stroke();

  // Inner Border
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
  ctx.lineWidth = 1;
  drawRoundedRect(32, 32, width - 64, height - 64, 14);
  ctx.stroke();

  // Fine accent border
  ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)';
  ctx.lineWidth = 1;
  drawRoundedRect(38, 38, width - 76, height - 76, 10);
  ctx.stroke();
  ctx.restore();

  // Corner Ornamental Flourishes
  const drawCornerFlourish = (cx: number, cy: number, flipX: number, flipY: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(flipX, flipY);
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 24);
    ctx.lineTo(0, 0);
    ctx.lineTo(24, 0);
    ctx.stroke();

    // Corner micro dot
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(6, 6, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCornerFlourish(48, 48, 1, 1);
  drawCornerFlourish(width - 48, 48, -1, 1);
  drawCornerFlourish(48, height - 48, 1, -1);
  drawCornerFlourish(width - 48, height - 48, -1, -1);

  // 5. TOP HEADER ROW
  // Left: Water Drop Crest & Logo
  ctx.save();
  const crestX = 72;
  const crestY = 74;

  // Crest Outer Glow Circle
  const crestGrad = ctx.createLinearGradient(crestX - 22, crestY - 22, crestX + 22, crestY + 22);
  crestGrad.addColorStop(0, '#22d3ee');
  crestGrad.addColorStop(1, '#0d9488');
  ctx.strokeStyle = crestGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(crestX, crestY, 20, 0, Math.PI * 2);
  ctx.stroke();

  // Crest Inner Fill
  ctx.fillStyle = 'rgba(6, 24, 46, 0.9)';
  ctx.beginPath();
  ctx.arc(crestX, crestY, 19, 0, Math.PI * 2);
  ctx.fill();

  // Water Droplet inside crest
  ctx.fillStyle = '#22d3ee';
  ctx.beginPath();
  ctx.moveTo(crestX, crestY - 10);
  ctx.bezierCurveTo(crestX + 6, crestY - 2, crestX + 10, crestY + 4, crestX + 10, crestY + 7);
  ctx.arc(crestX, crestY + 7, 10, 0, Math.PI);
  ctx.bezierCurveTo(crestX - 10, crestY + 4, crestX - 6, crestY - 2, crestX, crestY - 10);
  ctx.closePath();
  ctx.fill();

  // Crest Text
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('EVERY DROP', crestX + 32, crestY - 8);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('GLOBAL WATER GUARDIAN CERTIFICATE', crestX + 32, crestY + 12);
  ctx.letterSpacing = '0px';
  ctx.restore();

  // Right Header: Pledge Badge & Issue Date
  ctx.save();
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  // Pill Box for Registration ID
  const pillW = 210;
  const pillH = 30;
  const pillX = width - 72 - pillW;
  const pillY = 56;

  ctx.fillStyle = 'rgba(6, 28, 52, 0.85)';
  drawRoundedRect(pillX, pillY, pillW, pillH, 15);
  ctx.fill();
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Green active pulse dot
  ctx.fillStyle = '#2dd4bf';
  ctx.beginPath();
  ctx.arc(pillX + 16, pillY + 15, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 11px monospace';
  ctx.fillText(`PLEDGE ID: #${pledgeNum}`, width - 86, pillY + 15);

  // Date line below
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`ISSUED: ${dateText} · 2050 TARGET`, width - 72, 102);
  ctx.restore();

  // 6. DECORATIVE HAIRLINE DIVIDER
  const divGrad = ctx.createLinearGradient(100, 122, width - 100, 122);
  divGrad.addColorStop(0, 'rgba(34, 211, 238, 0)');
  divGrad.addColorStop(0.2, 'rgba(34, 211, 238, 0.45)');
  divGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.8)');
  divGrad.addColorStop(0.8, 'rgba(34, 211, 238, 0.45)');
  divGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 124);
  ctx.lineTo(width - 80, 124);
  ctx.stroke();

  // Tiny diamond in center of divider
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(width / 2, 120);
  ctx.lineTo(width / 2 + 5, 124);
  ctx.lineTo(width / 2, 128);
  ctx.lineTo(width / 2 - 5, 124);
  ctx.closePath();
  ctx.fill();

  // 7. CERTIFICATE SUBTITLE
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('THIS OFFICIAL CERTIFICATE COMMENDS', width / 2, 162);
  ctx.letterSpacing = '0px';
  ctx.restore();

  // 8. HONOREE NAME
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '900 48px "Plus Jakarta Sans", "Cinzel", Georgia, serif';

  // Glow shadow for name
  ctx.shadowColor = 'rgba(34, 211, 238, 0.45)';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, width / 2, 218);
  ctx.shadowBlur = 0;

  // Underline bar under name
  const nameWidth = Math.min(ctx.measureText(name).width + 80, 480);
  const nameUnderline = ctx.createLinearGradient(
    (width - nameWidth) / 2,
    0,
    (width + nameWidth) / 2,
    0
  );
  nameUnderline.addColorStop(0, 'rgba(34, 211, 238, 0)');
  nameUnderline.addColorStop(0.5, '#22d3ee');
  nameUnderline.addColorStop(1, 'rgba(34, 211, 238, 0)');
  ctx.fillStyle = nameUnderline;
  ctx.fillRect((width - nameWidth) / 2, 236, nameWidth, 2.5);
  ctx.restore();

  // 9. GUARDIAN TITLE BADGE (Pill)
  ctx.save();
  ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.letterSpacing = '2px';
  const titleText = `★  ${title.toUpperCase()}  ★`;
  const badgeW = ctx.measureText(titleText).width + 36;
  const badgeH = 34;
  const badgeX = (width - badgeW) / 2;
  const badgeY = 258;

  // Badge background gradient
  const badgeBg = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
  badgeBg.addColorStop(0, 'rgba(8, 47, 73, 0.9)');
  badgeBg.addColorStop(1, 'rgba(6, 28, 50, 0.95)');
  ctx.fillStyle = badgeBg;
  drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 17);
  ctx.fill();

  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Badge Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#67e8f9';
  ctx.fillText(titleText, width / 2, badgeY + badgeH / 2);
  ctx.letterSpacing = '0px';
  ctx.restore();

  // 10. SACRED PLEDGE STATEMENT (Italic poetic commitment)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'italic 15px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(
    '“I have solemnly committed to protecting every drop of Earth\'s water, eliminating waste,',
    width / 2,
    326
  );
  ctx.fillText(
    'safeguarding living rivers, and securing a water-abundant future for 2050.”',
    width / 2,
    350
  );
  ctx.restore();

  // 11. ACTIVE COMMITMENTS CHIPS / PILLS
  const defaultCommitments = [
    '✓ Save Water Daily',
    '✓ Fix Leaking Taps',
    '✓ Reduce Unnecessary Usage',
    '✓ Inspire & Encourage Others',
  ];
  const activeCommitments = (data.commitments && data.commitments.length > 0)
    ? data.commitments
    : defaultCommitments;

  ctx.save();
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  const chipH = 26;
  const chipGap = 12;

  // Calculate chip widths
  const chipWidths = activeCommitments.map((c) => ctx.measureText(c).width + 24);
  const totalChipsW = chipWidths.reduce((a, b) => a + b, 0) + (activeCommitments.length - 1) * chipGap;
  let currChipX = (width - totalChipsW) / 2;
  const chipY = 384;

  activeCommitments.forEach((chipText, i) => {
    const cW = chipWidths[i];
    ctx.fillStyle = 'rgba(6, 32, 54, 0.75)';
    drawRoundedRect(currChipX, chipY, cW, chipH, 13);
    ctx.fill();

    ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#a5f3fc';
    ctx.fillText(chipText, currChipX + cW / 2, chipY + chipH / 2);

    currChipX += cW + chipGap;
  });
  ctx.restore();

  // 12. LOWER VERIFICATION & OFFICIAL STAMPS ROW (y = 445 - 540)
  // Left: Official Circular Seal
  ctx.save();
  const sealX = 145;
  const sealY = 490;
  const sealR = 40;

  // Seal outer ring
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.stroke();

  // Seal inner dashed ring
  ctx.setLineDash([4, 3]);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Seal center droplet
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(sealX, sealY - 14);
  ctx.bezierCurveTo(sealX + 8, sealY - 4, sealX + 12, sealY + 4, sealX + 12, sealY + 8);
  ctx.arc(sealX, sealY + 8, 12, 0, Math.PI);
  ctx.bezierCurveTo(sealX - 12, sealY + 4, sealX - 8, sealY - 4, sealX, sealY - 14);
  ctx.closePath();
  ctx.fill();

  // Seal stars
  ctx.fillStyle = '#fef3c7';
  ctx.font = '8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('★ OFFICIAL SEAL ★', sealX, sealY + 28);
  ctx.fillText('2050 HORIZON', sealX, sealY - 26);
  ctx.restore();

  // Center: Official Status & Verification Details
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('STATUS: OFFICIALLY REGISTERED & CERTIFIED', width / 2, 475);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px monospace';
  ctx.fillText('VERIFICATION TOKEN: 2050-ED-WATER-PLEDGE-SECURE', width / 2, 495);

  // Digital barcode lines
  const barY = 512;
  const barW = 280;
  const barX = (width - barW) / 2;
  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  for (let b = 0; b < barW; b += 4) {
    const isThick = (b * 7) % 11 < 4;
    const isGap = (b * 13) % 9 === 0;
    if (!isGap) {
      ctx.fillRect(barX + b, barY, isThick ? 2.5 : 1.2, 16);
    }
  }
  ctx.restore();

  // Right: Signature Stamp
  ctx.save();
  const sigX = width - 180;
  const sigY = 485;

  ctx.textAlign = 'center';
  ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('The Citizens of Earth', sigX, sigY);

  // Signature line
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sigX - 90, sigY + 12);
  ctx.lineTo(sigX + 90, sigY + 12);
  ctx.stroke();

  ctx.font = 'bold 9px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('GLOBAL WATER INITIATIVE 2050', sigX, sigY + 26);
  ctx.restore();

  // 13. WEBSITE NAME & SHARING IN BOTTOM (USER REQUIREMENT)
  // Bottom sleek bar
  const footerH = 46;
  const footerY = height - 38 - footerH;
  const footerX = 38;
  const footerW = width - 76;

  ctx.save();
  // Footer container fill
  ctx.fillStyle = 'rgba(4, 18, 34, 0.9)';
  drawRoundedRect(footerX, footerY, footerW, footerH, 10);
  ctx.fill();

  // Top cyan hairline
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(footerX, footerY);
  ctx.lineTo(footerX + footerW, footerY);
  ctx.stroke();

  // Left Footer: Website Name with glowing accent
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('TAKE YOUR PLEDGE & SAVE THE FUTURE AT:', footerX + 20, footerY + footerH / 2);

  const prefixW = ctx.measureText('TAKE YOUR PLEDGE & SAVE THE FUTURE AT:').width;
  ctx.fillStyle = '#22d3ee';
  ctx.font = '900 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(website.toUpperCase(), footerX + 24 + prefixW, footerY + footerH / 2);

  // Right Footer: Campaign Hashtags & Impact
  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('EVERY DROP · #SaveWater2050 · SHARE TO INSPIRE', footerX + footerW - 20, footerY + footerH / 2);
  ctx.restore();
}

/**
 * Generates and triggers direct download of the pledge card as a high-quality JPG image.
 */
export async function downloadPledgeCardJpg(data: PledgeCardData): Promise<void> {
  const canvas = document.createElement('canvas');
  drawPledgeCard(canvas, data);

  const cleanName = (data.userName && data.userName.trim())
    ? data.userName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'WaterGuardian';
  const fileName = `EveryDrop-Pledge-${cleanName}.jpg`;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas blob generation failed'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        resolve();
      },
      'image/jpeg',
      0.96 // Ultra-high JPEG quality
    );
  });
}

/**
 * Mobile Native Share support: Shares the JPG file directly to WhatsApp, Instagram, Twitter, etc.
 * Falls back to standard download if file sharing is not supported by the browser.
 */
export async function sharePledgeCardJpg(data: PledgeCardData): Promise<boolean> {
  const canvas = document.createElement('canvas');
  drawPledgeCard(canvas, data);

  const cleanName = (data.userName && data.userName.trim())
    ? data.userName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'WaterGuardian';
  const fileName = `EveryDrop-Pledge-${cleanName}.jpg`;

  return new Promise((resolve) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }

        const file = new File([blob], fileName, { type: 'image/jpeg' });
        const shareData = {
          title: 'Every Drop Official Water Pledge',
          text: `I took the official Water Pledge as a Certified ${data.guardianTitle}! Join me and save our water future for 2050: ${data.websiteUrl || window.location.href}`,
          files: [file],
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            resolve(true);
            return;
          } catch {
            // User cancelled or share failed, fallback to download
          }
        }

        // Fallback: Trigger JPG download
        await downloadPledgeCardJpg(data);
        resolve(true);
      },
      'image/jpeg',
      0.96
    );
  });
}

