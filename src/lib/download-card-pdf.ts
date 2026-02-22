import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export async function downloadCardAsPDF(
  element: HTMLElement,
  filename = "business-card",
) {
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Standard business card size: 3.5 x 2 inches (landscape)
  // Use the aspect ratio of the captured element
  const isVertical = imgHeight > imgWidth;
  const pdfWidth = isVertical ? 2 : 3.5;
  const pdfHeight = isVertical ? 3.5 : 2;

  const pdf = new jsPDF({
    orientation: isVertical ? "portrait" : "landscape",
    unit: "in",
    format: [pdfWidth, pdfHeight],
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${filename}.pdf`);
}
