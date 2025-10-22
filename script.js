const canvas = document.getElementById('bingoCanvas');
const ctx = canvas.getContext('2d');

// Coordonnées des centres des cases (à ajuster selon votre PNG)
// Mesurez les positions des centres des cases sur votre image PNG (en pixels)
// Exemple : [x, y] pour chaque case, ligne par ligne, gauche à droite
const cellPositions = [
    [83, 315], [193, 315], [303, 315], [413, 315], [523, 315],
    [83, 425], [193, 425], [303, 425], [413, 425], [523, 425],
    [83, 535], [193, 535], [303, 535], [413, 535], [523, 535],
    [83, 645], [193, 645], [303, 645], [413, 645], [523, 645],
    [83, 755], [193, 755], [303, 755], [413, 755], [523, 755]
  ];
// Ranges par colonne (B=1-15, I=16-30, N=31-45, G=46-60, O=61-75)
const colRanges = [
  [1, 15],   // Colonne 1 (B)
  [16, 30],  // Colonne 2 (I)
  [31, 45],  // Colonne 3 (N)
  [46, 60],  // Colonne 4 (G)
  [61, 75]   // Colonne 5 (O)
];

let drawnNumbers = []; // Stockage des nombres affichés

// Charger l'image PNG originale
const img = new Image();
img.src = 'bingo-template.png';
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};

function clearGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  drawnNumbers = [];
}

function generateRandomNumbers() {
  clearGrid();

  const usedNumbers = new Set();
  for (let col = 0; col < 5; col++) {
    const [min, max] = colRanges[col];
    for (let row = 0; row < 5; row++) {
      if (row === 2 && col === 2) continue; // Case centrale libre

      let num;
      do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (usedNumbers.has(num));

      usedNumbers.add(num);
      drawnNumbers.push({ col, row, num });

      // Dessiner le nombre
      drawNumberAtPosition(col, row, num);
    }
  }
}

function drawNumberAtPosition(col, row, num) {
  const idx = row * 5 + col;
  const [x, y] = cellPositions[idx];

  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(num, x, y);
}

function exportPNG() {
  const link = document.createElement('a');
  link.download = 'grille-bingo-remplie.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
