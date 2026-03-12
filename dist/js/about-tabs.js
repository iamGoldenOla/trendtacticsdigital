/**
 * Handles tab switching for the Brand Philosophy section on the About page.
 */
function switchPhilosophyTab(tabId) {
    const tabs = document.querySelectorAll('.tab-panel');
    const btns = document.querySelectorAll('.tab-btn');

    // Remove active class from all tabs and buttons
    tabs.forEach(tab => tab.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active'));

    // Add active class to selected tab and button
    const selectedTab = document.getElementById('tab-' + tabId);
    const selectedBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);

    if (selectedTab) selectedTab.classList.add('active');
    if (selectedBtn) selectedBtn.classList.add('active');
}

// Initialize tabs on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchPhilosophyTab(tabId);
        });
    });
});
