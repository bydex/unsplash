export const downloadFileByLink = ({ href, fileName = "download" }) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = href;
  downloadLink.download = fileName;
  downloadLink.click();
  downloadLink.remove();
};
