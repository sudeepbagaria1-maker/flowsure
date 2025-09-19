function createDepartmentFilter() {
  console.log('Creating department filter');
  
  // Create the main container div
  const container = document.createElement('div');
  container.className = 'department-filter';
  
  // Create the title div
  const title = document.createElement('div');
  title.className = 'filter-title';
  title.id = 'filter-title';
  title.textContent = 'Department Filter';
  container.appendChild(title);
  
  // Create the checkboxes container
  const checkboxesContainer = document.createElement('div');
  checkboxesContainer.className = 'checkboxes-container';
  container.appendChild(checkboxesContainer);
  
  // Define the department roles
  const departments = [
    'presales',
    'presales manager',
    'bd',
    'bd manager',
    'Delivery',
    'Delivery Manager',
    'Finance',
    'Finance Manager',
    'Owner'
  ];
  
  // Create checkboxes for each department
  departments.forEach(department => {
    // Create the checkbox item div
    const checkboxItem = document.createElement('div');
    checkboxItem.className = 'checkbox-item';
    
    // Create the checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'department-' + department.replace(/\s+/g, '-').toLowerCase();
    checkbox.name = 'department';
    checkbox.value = department;
    checkbox.checked = true; // All checkboxes checked by default
    
    // Create the label
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = department;
    
    // Add checkbox and label to the item div
    checkboxItem.appendChild(checkbox);
    checkboxItem.appendChild(label);
    
    // Add the item to the checkboxes container
    checkboxesContainer.appendChild(checkboxItem);
  });
  
  console.log('Department filter created');
  return container;
}

// Make the function available globally
window.createDepartmentFilter = createDepartmentFilter;