/**
 * Menghitung metode Simple Additive Weighting (SAW) untuk kumpulan alternatif dan kriteria yang diberikan.
 *
 * @param {Array} alternatives - Sebuah array objek yang mewakili alternatif, masing-masing dengan properti 'name' dan 'criteria', yang merupakan array angka yang mewakili nilai kriteria untuk alternatif tersebut.
 * @param {Array} criteria - Sebuah array objek yang mewakili kriteria, masing-masing dengan properti 'weight' dan 'type', yang bisa 'benefit' atau 'cost'.
 * @return {Object} - Sebuah objek dengan dua properti: 'normalized', yang merupakan array objek yang mewakili alternatif dengan nilai kriteria yang dinormalisasi, dan 'scores', yang merupakan array objek yang mewakili alternatif dengan skor SAW mereka, diurutkan secara menurun.
 */

const sawMethod = (alternatives, criteria) => {
  // Normalisasi nilai alternatif
  const normalized = alternatives.map((alt) => {
    return {
      ...alt,
      normalizedCriteria: alt.criteria.map((value, index) => {
        const max = Math.max(...alternatives.map((a) => a.criteria[index]));
        const min = Math.min(...alternatives.map((a) => a.criteria[index]));
        if (criteria[index].type === "benefit") {
          return max !== 0 ? value / max : 0;
        } else {
          return value !== 0 ? min / value : 0;
        }
      }),
    };
  });

  // Hitung skor SAW
  const scores = normalized.map((alt) => {
    return {
      ...alt,
      score: alt.normalizedCriteria.reduce(
        (acc, val, index) => acc + val * criteria[index].weight,
        0
      ),
    };
  });
  return { normalized, scores: scores.sort((a, b) => b.score - a.score) };
};

/**
 * Menghitung metode Simple Additive Weighting (SAW) untuk set alternatif dan kriteria yang diberikan.
 *
 * @param {Object} req - Objek permintaan yang berisi body dengan 'alternatives', 'criteriaWeights', dan 'criteriaTypes'.
 * @param {Object} res - Objek respons untuk mengirim hasil perhitungan SAW.
 */

const calculateSAW = (req, res) => {
  const { alternatives, criteriaWeights, criteriaTypes } = req.body;

  if (!criteriaTypes || !criteriaTypes.length) {
    return res.status(400).json({ error: "Criteria types are missing" });
  }

  const criteria = criteriaWeights.map((weight, index) => ({
    weight,
    type: criteriaTypes[index],
  }));

  try {
    const result = sawMethod(alternatives, criteria);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  calculateSAW,
};
