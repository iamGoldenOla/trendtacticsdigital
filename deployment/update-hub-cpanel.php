<?php
// Script to update hub.html from GitHub to cPanel
echo "<h1>Hub Page Update Script</h1>";

// Download the new hub.html from GitHub
$githubUrl = 'https://raw.githubusercontent.com/iamGoldenOla/trendtacticsdigital/main/hub.html';
$newHubContent = file_get_contents($githubUrl);

if ($newHubContent === FALSE) {
    echo "<p style='color:red;'>Error: Could not download hub.html from GitHub</p>";
    exit;
}

// Save to current directory
$result = file_put_contents('hub.html', $newHubContent);

if ($result === FALSE) {
    echo "<p style='color:red;'>Error: Could not save hub.html to server</p>";
} else {
    echo "<p style='color:green;'>Success: hub.html has been updated!</p>";
    echo "<p>File size: " . filesize('hub.html') . " bytes</p>";
}

// Also update index.html if needed
$indexPath = 'index.html';
if (file_exists($indexPath)) {
    echo "<p><a href='index.html'>Check Homepage</a></p>";
}
echo "<p><a href='hub.html'>Check Hub Page</a></p>";
?>