<?php
/**
 * fix-permissions.php - Trendtactics Digital
 * 
 * INSTRUCTIONS:
 * 1. Upload this file to your public_html root on cPanel
 * 2. Visit https://trendtacticsdigital.com/fix-permissions.php
 * 3. It will set all files to 644 and all directories to 755
 * 4. DELETE this file immediately after running it!
 * 
 * SECURITY: This script is protected by a secret key.
 * Access it at: /fix-permissions.php?key=TRENDTACTICS_FIX_2024
 */

// ── Security: require a secret key to run ──
$secret = 'TRENDTACTICS_FIX_2024';
if (!isset($_GET['key']) || $_GET['key'] !== $secret) {
    http_response_code(403);
    die('403 Forbidden. Append ?key=TRENDTACTICS_FIX_2024 to the URL to run this script.');
}

// ── Configuration ──
$rootDir = __DIR__; // public_html directory
$filePerms = 0644;  // rw-r--r--
$dirPerms  = 0755;  // rwxr-xr-x

// Directories that should NOT be publicly accessible (set to 750)
$restrictedDirs = ['backend', 'supabase', 'node_modules', '.git'];

$fixed   = 0;
$skipped = 0;
$errors  = [];

echo '<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Fix Permissions - Trendtactics Digital</title>
<style>
  body { font-family: monospace; background: #111; color: #0f0; padding: 20px; }
  h1 { color: #ff0; }
  .ok { color: #0f0; }
  .err { color: #f00; }
  .warn { color: #fa0; }
  .done { background: #0a0; color: #fff; padding: 10px; margin-top: 20px; font-size: 1.2em; }
</style>
</head><body>';
echo '<h1>🔧 Trendtactics Digital - Permission Fixer</h1>';
echo '<p>Root: <strong>' . htmlspecialchars($rootDir) . '</strong></p>';
echo '<p>Running... (this may take a moment)</p><hr>';
echo '<pre>';
flush();

/**
 * Recursively fix permissions
 */
function fixPermissions($path, $filePerms, $dirPerms, $restrictedDirs, &$fixed, &$skipped, &$errors) {
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );

    foreach ($iterator as $item) {
        $itemPath = $item->getPathname();
        $name = basename($itemPath);

        // Skip hidden system files
        if (substr($name, 0, 1) === '.' && !in_array($name, ['.htaccess'])) {
            $skipped++;
            continue;
        }

        // Check if it's in a restricted directory
        $isRestricted = false;
        foreach ($restrictedDirs as $rDir) {
            if (strpos($itemPath, DIRECTORY_SEPARATOR . $rDir . DIRECTORY_SEPARATOR) !== false
                || strpos($itemPath, DIRECTORY_SEPARATOR . $rDir) === strlen($itemPath) - strlen($rDir) - 1) {
                $isRestricted = true;
                break;
            }
        }

        if ($item->isDir()) {
            $perms = $isRestricted ? 0750 : $dirPerms;
            if (@chmod($itemPath, $perms)) {
                echo '<span class="ok">DIR  ' . sprintf('%04o', $perms) . '  ' . htmlspecialchars($itemPath) . '</span>' . "\n";
                $fixed++;
            } else {
                echo '<span class="err">FAIL ' . htmlspecialchars($itemPath) . '</span>' . "\n";
                $errors[] = $itemPath;
            }
        } elseif ($item->isFile()) {
            if (@chmod($itemPath, $filePerms)) {
                $fixed++;
            } else {
                echo '<span class="err">FAIL ' . htmlspecialchars($itemPath) . '</span>' . "\n";
                $errors[] = $itemPath;
            }
        }
    }
}

// Fix the root directory itself
if (@chmod($rootDir, $dirPerms)) {
    echo '<span class="ok">DIR  0755  ' . htmlspecialchars($rootDir) . ' (root)</span>' . "\n";
    $fixed++;
} else {
    $errors[] = $rootDir;
}

fixPermissions($rootDir, $filePerms, $dirPerms, $restrictedDirs, $fixed, $skipped, $errors);

echo '</pre><hr>';
echo '<div class="done">';
echo '✅ Done! Fixed: <strong>' . $fixed . '</strong> items. ';
echo 'Skipped: <strong>' . $skipped . '</strong>. ';
echo 'Errors: <strong>' . count($errors) . '</strong>.';
echo '</div>';

if (!empty($errors)) {
    echo '<p class="err">⚠️ Some items could not be changed (normal for system-owned files):</p><ul>';
    foreach (array_slice($errors, 0, 20) as $e) {
        echo '<li>' . htmlspecialchars($e) . '</li>';
    }
    echo '</ul>';
}

echo '<p class="warn">⚠️ <strong>IMPORTANT: Delete this file now!</strong> 
Go to cPanel → File Manager → Delete <code>fix-permissions.php</code></p>';
echo '</body></html>';
