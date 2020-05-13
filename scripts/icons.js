const fs = require('fs');
const path  = require('path');
const SVGO = require('svgo');
const rimraf = require('rimraf');
const symbol = require('./utils/symbol');
const { iconsMap } = require('./utils/icons');

console.log('generating icons...');

const DIST_FOLDER = 'dist'

const icons = iconsMap()
const cwd = process.cwd();

const svgo = new SVGO({
    removeViewBox: false
});

if (!fs.existsSync(path.join(cwd, DIST_FOLDER))) {
    fs.mkdirSync(path.join(cwd, DIST_FOLDER))
} else {
    rimraf.sync(`${path.join(cwd, DIST_FOLDER, '*')}`);
}

const promises = icons.map(({ id, size }) => {
    const svg = fs.readFileSync(path.join(cwd, `src/svg/${size}/${id}_${size}.svg`), 'utf-8');
    return svgo.optimize(svg).then(({ data }) => {
        return data
    }).then((content) => {
        console.log(content);
        return symbol({ content, id: `${id}_${size}`, size })
    }).then((result) => {
        const iconDir = path.join(cwd, DIST_FOLDER, size);
        if (!fs.existsSync(iconDir)) {
            fs.mkdirSync(iconDir)
        }
        fs.writeFileSync(path.join(iconDir, `${id}.vue`), result);
        // fs.copyFileSync(path.join(cwd, 'src/declaration.d.ts'), path.join(iconDir, `${id}.d.ts`));
    })
});

Promise.all(promises).then(() => {
    console.log(`icons successfully generated in ${DIST_FOLDER}!`)
})
