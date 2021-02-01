function symbol({ viewbox, content, id, size }) {

    const width = size
    const height = size

    const classList = `vc-Icon vc-Icon--${ id } vc-Icon--${ size }`
    const style = `width: ${ width }px; height: ${ height }px`

    const code = `
<template>
    <div class="${ classList }" style="${ style }">
      <svg viewBox="0 0 ${ width } ${ height }" width="${width}" height="${height}">
        ${content}
      </svg>
    </div>
</template>

<script>
    export default {
      name: 'icon-${ id }',
    }
</script>

`

    return code

}

module.exports = symbol;
