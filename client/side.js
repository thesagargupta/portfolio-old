function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
  
  // Add event listener to hide the sidebar when an option is clicked
  const menuOptions = sidebar.querySelectorAll('li');
  menuOptions.forEach(option => {
    option.addEventListener('click', hideSidebar);
  });
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}
