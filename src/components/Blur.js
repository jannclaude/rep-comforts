import NavScroll from "./AppNavbar";

export default function BlurHeader() {
    return (
        <div class="blurred-overlay d-flex flex-row fixed-top container-fluid">
				<div class="blur d-flex flex-row container-fluid"></div>
				<NavScroll />
		</div>
    )
}

