import jsPDF from "jspdf";

type rgbColor = {
  red: number;
  blue: number;
  green: number;
};

function setBackground(report: jsPDF, backgroundColor: rgbColor) {
  const reportWidth = report.internal.pageSize.getWidth();
  const reportHeight = report.internal.pageSize.getHeight();
  report.setFillColor(
    backgroundColor.red,
    backgroundColor.green,
    backgroundColor.blue
  );
  report.rect(0, 0, reportWidth, reportHeight, "F");
}
