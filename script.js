document.getElementById('coolingTowerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const deltaT = parseFloat(document.getElementById('temperatureDifference').value);
    const flowRate = parseFloat(document.getElementById('flowRate').value);
    const cyclesOfConcentration = parseFloat(document.getElementById('cyclesOfConcentration').value);
    const corrosionInhibitorDose = parseFloat(document.getElementById('corrosionInhibitorDose').value);
    const biocideDose = parseFloat(document.getElementById('biocideDose').value);
    const scaleInhibitorDose = parseFloat(document.getElementById('scaleInhibitorDose').value);
    const bioDispersantDose = parseFloat(document.getElementById('bioDispersantDose').value);

    // Calculate Evaporation Loss (E)
    const evaporationLoss = (1 / 1000) * deltaT * flowRate * 24;

    // Calculate Windage Loss (W)
    const windageLoss = (flowRate * 24) / 1000;

    // Calculate Blowdown Rate (B)
    const blowdownRate = evaporationLoss / (cyclesOfConcentration - 1) - windageLoss;

    // Calculate Make-up Water (M)
    const makeUpWater = evaporationLoss + windageLoss + blowdownRate;

    // Calculate Chemical Requirements
    const corrosionInhibitor = (corrosionInhibitorDose * 1000) * makeUpWater / 1000000;
    const biocide = (biocideDose * 1000) * makeUpWater / 1000000;
    const scaleInhibitor = (scaleInhibitorDose * 1000) * makeUpWater / 1000000;
    const bioDispersant = (bioDispersantDose * 1000) * makeUpWater / 1000000;

    // Display results
    document.getElementById('result').innerHTML = `
        <p>Evaporation Loss (E): ${evaporationLoss.toFixed(2)} liter/hari</p>
        <p>Windage Loss (W): ${windageLoss.toFixed(2)} liter/hari</p>
        <p>Blowdown Rate (B): ${blowdownRate.toFixed(2)} liter/hari</p>
        <p>Make-up Water (M): ${makeUpWater.toFixed(2)} liter/hari</p>
        <p>Corrosion Inhibitor: ${corrosionInhibitor.toFixed(2)} ml/hari</p>
        <p>Biocide: ${biocide.toFixed(2)} ml/hari</p>
        <p>Scale Inhibitor: ${scaleInhibitor.toFixed(2)} ml/hari</p>
        <p>Bio Dispersant: ${bioDispersant.toFixed(2)} ml/hari</p>
    `;
});
