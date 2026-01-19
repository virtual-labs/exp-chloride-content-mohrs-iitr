<?php
// send.php
session_start();

// Retrieve data from the GET request
$_SESSION['V_titrant'] = isset($_GET['data1']) ? $_GET['data1'] : ''; // Volume of titrant added (mL)
$_SESSION['V_sample'] = isset($_GET['data2']) ? $_GET['data2'] : '';  // Volume of sample (mL)
$_SESSION['N_titrant'] = isset($_GET['data3']) ? $_GET['data3'] : ''; // Normality of titrant (N)
$_SESSION['N_sample'] = isset($_GET['data4']) ? $_GET['data4'] : '';  // Normality of sample (N)

// Optional: Calculate chloride content here if needed
// Chloride (mg/L) = (N_sample * V_sample * 35.45 * 1000) / V_titrant ? Wait, no:
// Actually, from equivalence: N_titrant * V_titrant = N_sample * V_sample
// So N_sample = (N_titrant * V_titrant) / V_sample
// But since N_sample was simulated as random, perhaps store calculated for verification.
// For now, just store the values.

// Use the data as needed
// Your processing logic here

// Prepare the response
$response = ['message' => 'Value received successfully (Page 2)'];

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>