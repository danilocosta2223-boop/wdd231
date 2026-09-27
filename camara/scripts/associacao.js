document.addEventListener("DOMContentLoaded", () => {

    // Timestamp
    const timestamp = document.getElementById("timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // Modais
    const npBtn = document.getElementById("np-btn");
    const bronzeBtn = document.getElementById("bronze-btn");
    const silverBtn = document.getElementById("silver-btn");
    const goldBtn = document.getElementById("gold-btn");

    const modalNp = document.getElementById("modal-np");
    const modalBronze = document.getElementById("modal-bronze");
    const modalSilver = document.getElementById("modal-silver");
    const modalGold = document.getElementById("modal-gold");

    if (npBtn) {
        npBtn.addEventListener("click", () => {
            modalNp.showModal();
        });
    }

    if (bronzeBtn) {
        bronzeBtn.addEventListener("click", () => {
            modalBronze.showModal();
        });
    }

    if (silverBtn) {
        silverBtn.addEventListener("click", () => {
            modalSilver.showModal();
        });
    }

    if (goldBtn) {
        goldBtn.addEventListener("click", () => {
            modalGold.showModal();
        });
    }
});