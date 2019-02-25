export default (name, count, isChecked = false) => `<a
href="#${name}"
class="main-navigation__item
${ isChecked ? `main-navigation__item--active` : `` }">
${name[0].toUpperCase() + name.substring(1)}
${ count ? (`<span class="main-navigation__item-count">` + count + `</span>`) : ``}
</a>`;
