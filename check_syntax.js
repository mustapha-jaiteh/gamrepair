const fs = require('fs');
const acorn = require('acorn');
const jsx = require('acorn-jsx');

const code = fs.readFileSync('c:/Users/HP/Desktop/projects/breakdown-assistance/orvba-app/resources/js/Pages/Admin/UserDetails.jsx', 'utf8');

try {
    acorn.Parser.extend(jsx()).parse(code, {
        sourceType: 'module',
        ecmaVersion: 2020
    });
    console.log('UserDetails.jsx: Syntax OK');
} catch (e) {
    console.error('UserDetails.jsx: Syntax Error: ' + e.message);
    console.error('At line ' + e.loc.line + ', column ' + e.loc.column);
}

const code2 = fs.readFileSync('c:/Users/HP/Desktop/projects/breakdown-assistance/orvba-app/resources/js/Pages/Admin/MechanicDetails.jsx', 'utf8');

try {
    acorn.Parser.extend(jsx()).parse(code2, {
        sourceType: 'module',
        ecmaVersion: 2020
    });
    console.log('MechanicDetails.jsx: Syntax OK');
} catch (e) {
    console.error('MechanicDetails.jsx: Syntax Error: ' + e.message);
    console.error('At line ' + e.loc.line + ', column ' + e.loc.column);
}
