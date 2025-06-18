
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { UI_TEXT } from '../constants';

const addTextToPdf = (pdf: jsPDF, title: string, text: string, startY: number): number => {
  pdf.setFontSize(16);
  pdf.text(title, 15, startY);
  pdf.setFontSize(10);
  const splitText = pdf.splitTextToSize(text, pdf.internal.pageSize.width - 30);
  pdf.text(splitText, 15, startY + 10);
  return startY + 10 + (splitText.length * pdf.getLineHeight() / (pdf.internal.scaleFactor * 0.8)); // Estimate new Y
};


export const exportToPDF = (enhancedText: string, originalText: string): void => {
  const pdf = new jsPDF();
  
  pdf.setFont('helvetica', 'normal'); // Basic font, ensure it supports Polish characters if possible or use custom font.
                                    // For full Unicode, more complex setup with custom fonts is needed for jsPDF.

  let currentY = 20;
  if (originalText) {
    currentY = addTextToPdf(pdf, UI_TEXT.ORIGINAL_TEXT_HEADER, originalText, currentY);
    currentY += 15; // Add some space
  }
  
  addTextToPdf(pdf, UI_TEXT.ENHANCED_TEXT_HEADER, enhancedText, currentY);

  pdf.save('ulepszony_tekst.pdf');
};

export const exportToDOCX = async (enhancedText: string, originalText: string): Promise<void> => {
  const children: (Paragraph | TextRun)[] = [];

  if (originalText) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: UI_TEXT.ORIGINAL_TEXT_HEADER, bold: true, size: 28 })], // size is in half-points
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun(originalText)],
        spacing: { after: 400 },
      })
    );
  }

  children.push(
    new Paragraph({
      children: [new TextRun({ text: UI_TEXT.ENHANCED_TEXT_HEADER, bold: true, size: 28 })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun(enhancedText)],
    })
  );

  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ulepszony_tekst.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

export const exportToTXT = (enhancedText: string): void => {
  const blob = new Blob([
    `${UI_TEXT.ENHANCED_TEXT_HEADER}\n\n${enhancedText}`
  ], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ulepszony_tekst.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
