<?php
session_start();

// Access the values stored in the session variables
$V_sample = floatval($_SESSION['V_sample']); // V1: Volume of sample (mL)
$V_titrant = floatval($_SESSION['V_titrant']); // V2: Volume of titrant added (mL)
$N_titrant = floatval($_SESSION['N_titrant']); // N2: Normality of titrant (N)
$N_sample = floatval($_SESSION['N_sample']); // N1: Normality of sample from simulation (N)

// For consistency and accuracy, calculate N1 from titration data: N1 = (N2 * V2) / V1
// Note: Due to simulation parameters, this may differ slightly from $N_sample; using calculated for result
$N1_calculated = ($N_titrant * $V_titrant) / $V_sample;

// Calculate chloride content in ppm
$chloride_ppm = round($N1_calculated * 35.5, 2);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titration Finished</title>
    <link rel="stylesheet" href="css/Other.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
    }

    .container {
      text-align: center;
      width: 90%;
      max-width: 800px;
    }

    h1, h2, h3 {
      color: #333;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 16px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 500;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    .calculations {
      text-align: left;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 16px;
    }

    .calculations pre {
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      margin: 0;
    }

    .links {
      margin: 20px 0;
    }

    .links a {
      text-decoration: none;
      color: blue;
      margin-right: 20px;
    }

    button.mybutton {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    button.mybutton:hover {
      background-color: #45a049;
    }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Titration is Finished</h1>
        <h2>Determination of Chloride Content</h2>
        <h3>Observation Table</h3>

        <table>
            <thead>
                <tr>
                    <th>Volume Taken for Sample (V1)</th>
                    <th>Volume Consumed (V2)</th>
                    <th>Normality Set for Titrant (N2)</th>
                    <th>Normality of Sample (N1)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><?php echo round($V_sample, 2); ?> mL</td>
                    <td><?php echo round($V_titrant, 2); ?> mL</td>
                    <td><?php echo round($N_titrant, 3); ?> N</td>
                    <td><?php echo round($N1_calculated, 3); ?> N</td>
                </tr>
            </tbody>
        </table>

        <h3>Calculations</h3>
        <div class="calculations">
            <pre>
Chloride content (ppm) = N1 × 35.5
                       = <?php echo round($N1_calculated, 3); ?> × 35.5
                       = <?php echo $chloride_ppm; ?> ppm
            </pre>
        </div>

        <div class="links">
            <a href="calc.png" target="_blank">For Detailed Calculation, Click here</a>
            <a href="../simTest/"><button class="mybutton">Replay <span style="font-weight:bolder; font-size:18px">&#8634;</span></button></a>
        </div>
    </div>
</body>
</html>