<?php
$md = file_get_contents('C:\Users\HP\.gemini\antigravity\brain\748dbd7c-75f5-4a25-a588-f884adc415f9\documentation.md');
$html = "<html><head><style>
body{font-family:sans-serif;line-height:1.6;padding:40px;max-width:800px;margin:auto;color:#334155;}
h1,h2,h3{color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:10px;margin-top:2em;}
code{background:#f1f5f9;padding:2px 4px;border-radius:4px;font-family:monospace;font-size:0.9em;}
pre{background:#f8fafc;padding:15px;border-radius:12px;overflow-x:auto;border:1px solid #e2e8f0;font-family:monospace;white-space:pre-wrap;}
ul{padding-left:20px;}
li{margin-bottom:8px;}
hr{border:0;border-top:1px solid #e2e8f0;margin:2em 0;}
</style></head><body>";

// Very basic MD to HTML conversion
$lines = explode("\n", $md);
foreach ($lines as $line) {
    if (strpos($line, '# ') === 0) {
        $html .= "<h1>" . htmlspecialchars(substr($line, 2)) . "</h1>";
    } elseif (strpos($line, '## ') === 0) {
        $html .= "<h2>" . htmlspecialchars(substr($line, 3)) . "</h2>";
    } elseif (strpos($line, '### ') === 0) {
        $html .= "<h3>" . htmlspecialchars(substr($line, 4)) . "</h3>";
    } elseif (strpos($line, '- ') === 0) {
        $html .= "<ul><li>" . htmlspecialchars(substr($line, 2)) . "</li></ul>";
    } elseif (trim($line) === '---') {
        $html .= "<hr>";
    } else {
        $html .= "<p>" . nl2br(htmlspecialchars($line)) . "</p>";
    }
}

$html .= "</body></html>";
file_put_contents('c:\Users\HP\Desktop\projects\breakdown-assistance\orvba-app\documentation.html', $html);
echo "HTML Documentation generated.\n";
