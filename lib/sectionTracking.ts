/** Choose the section already reached by the viewport's reading line. */
export function activeSectionAt(sections: { id: string; top: number }[], readingLine: number) {
  let active = "home";
  for (const section of sections) {
    if (section.top <= readingLine) active = section.id;
  }
  return active;
}
