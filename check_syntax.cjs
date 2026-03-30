
const code3 = fs.readFileSync('c:/Users/HP/Desktop/projects/breakdown-assistance/orvba-app/resources/js/Pages/Admin/Users.jsx', 'utf8');
try {
    acorn.Parser.extend(jsx()).parse(code3, {
        sourceType: 'module',
        ecmaVersion: 2020
    });
    console.log('Users.jsx: Syntax OK');
} catch (e) {
    console.error('Users.jsx: Syntax Error: ' + e.message);
    console.error('At line ' + e.loc.line + ', column ' + e.loc.column);
}

