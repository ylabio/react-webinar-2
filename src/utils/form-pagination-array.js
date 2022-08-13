export function formPaginationArray(current_page, last_page) {
  let content = [
    1,
    current_page - 1,
    current_page,
    current_page + 1,
    last_page,
  ];

  content = content.filter((item) => item > 0 && item <= last_page);
  content = [...new Set(content)];

  if (last_page <= 3) return content;

  if (current_page <= 3) {
    content.splice(content.length - 1, 0, "...");
  }
  if (current_page > 3 && current_page < last_page - 2) {
    content.splice(1, 0, "...");
    content.splice(content.length - 1, 0, "...");
  }
  if (current_page >= last_page - 2) {
    content.splice(1, 0, "...");
  }
  return content;
}
