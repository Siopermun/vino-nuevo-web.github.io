// src/bible.ts

const bibleVerses = [
  "Juan 3:16",
  "Filipenses 4:13",
  "Romanos 8:28",
  "Salmo 23:1",
  "Proverbios 3:5-6",
  "Isaías 41:10",
  "Mateo 6:33",
  "Jeremías 29:11",
  "Hebreos 11:1",
  "Gálatas 2:20",
  "Josué 1:9",
  "Salmo 46:1",
  "1 Corintios 10:13",
  "Romanos 10:9-10",
  "Santiago 1:5",
  "2 Timoteo 3:16",
  "1 Pedro 5:7",
  "Efesios 2:8-9",
  "Juan 14:6",
  "Romanos 12:2"
];

export const displayBibleVerse = async () => {
  const verseElement = document.getElementById('biblical-text');
  if (!verseElement) {
    console.error('El elemento #biblical-text no fue encontrado.');
    return;
  }

  // Select a random verse
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  const randomVerse = bibleVerses[randomIndex];

  try {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(randomVerse)}?translation=rvr1960`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el texto bíblico.');
    }
    const data = await response.json();
    verseElement.innerHTML = `
      <p>"${data.text}"</p>
      <p><em>${data.reference}</em></p>
    `;
  } catch (error) {
    console.error('Error al cargar el texto bíblico:', error);
    verseElement.innerHTML = '<p>No se pudo cargar el texto bíblico en este momento.</p>';
  }
};
