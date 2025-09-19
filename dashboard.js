// dashboard.js - Dashboard functionality for Flowsure CRM
// This file contains functions to populate the dashboard with sample data and handle user interactions

/**
 * Initialize the dashboard when the page loads
 */
function initDashboard() {
    console.log('Initializing dashboard');
    
    // Populate the dashboard with sample data
    populateDashboard();
    
    // Create the lead detail modal
    createLeadDetailModal();
    
    console.log('Dashboard initialized');
}

/**
 * Populate the dashboard with sample data from data.js
 * This function creates a welcome message, department filter, summary cards, and the leads table
 */
function populateDashboard() {
    console.log('Populating dashboard');
    
    // Check if sampleLeads is defined
    if (typeof sampleLeads === 'undefined') {
        console.error('sampleLeads is not defined');
        return;
    }
    
    // Get the sample leads data
    const leads = sampleLeads || [];
    console.log('Sample leads:', leads.length);
    console.log('SampleLeads object:', sampleLeads);
    
    // Create welcome message
    createWelcomeMessage();
    
    // Create department filter
    createDepartmentFilterSection();
    
    // Create summary cards
    createSummaryCards(leads);
    
    // Create leads table
    createLeadsTable(leads);
    
    console.log('Dashboard populated');
}

/**
 * Create a welcome message section
 */
function createWelcomeMessage() {
    console.log('Creating welcome message');
    
    const welcomeHTML = `
        <div class="welcome-message">
            <h2>CRM Dashboard</h2>
            <p>Welcome to your customer management experience</p>
        </div>
    `;
    
    // Insert welcome message into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    console.log('Dashboard content element:', dashboardContent);
    
    if (dashboardContent) {
        dashboardContent.innerHTML = welcomeHTML;
        console.log('Welcome message created');
    } else {
        console.log('Dashboard content element not found');
    }
}

/**
 * Create the department filter section
 */
function createDepartmentFilterSection() {
    console.log('Creating department filter section');
    
    // Create the department filter
    const filterElement = window.createDepartmentFilter();
    
    // Insert filter into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    console.log('Dashboard content element for filter:', dashboardContent);
    
    if (dashboardContent) {
        dashboardContent.appendChild(filterElement);
        
        // Add event listeners to checkboxes
        setTimeout(() => {
            addDepartmentFilterEventListeners();
            // Update the filter title when the dashboard first loads
            updateFilterTitle();
        }, 100);
        
        console.log('Department filter section created');
    } else {
        console.log('Dashboard content element not found for filter');
    }
}

/**
 * Add event listeners to department filter checkboxes
 */
function addDepartmentFilterEventListeners() {
    const checkboxes = document.querySelectorAll('input[name="department"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Filter leads and update the table when any checkbox changes
            const filteredLeads = filterLeadsByDepartment();
            updateLeadsTable(filteredLeads);
            
            // Also update summary cards
            createSummaryCards(filteredLeads);
            
            // Update the filter title
            updateFilterTitle();
        });
    });
}

/**
 * Update the filter title based on selected departments
 */
function updateFilterTitle() {
    // Get all department checkboxes
    const allCheckboxes = document.querySelectorAll('input[name="department"]');
    const checkedCheckboxes = document.querySelectorAll('input[name="department"]:checked');
    
    // Get the filter title element
    const filterTitleElement = document.getElementById('filter-title');
    
    if (filterTitleElement) {
        // Check if all departments are selected
        if (checkedCheckboxes.length === allCheckboxes.length) {
            filterTitleElement.textContent = 'See working dashboard as All Departments';
        } else {
            // Create a comma-separated list of selected department names
            const selectedDepartments = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
            filterTitleElement.textContent = `See working dashboard as ${selectedDepartments.join(', ')}`;
        }
    }
}

/**
 * Filter leads by selected departments
 * @returns {Array} - Array of filtered lead objects
 */
function filterLeadsByDepartment() {
    // Get all checked department values
    const checkedCheckboxes = document.querySelectorAll('input[name="department"]:checked');
    const selectedDepartments = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
    
    // If no departments are selected, return empty array
    if (selectedDepartments.length === 0) {
        return [];
    }
    
    // Filter the sampleLeads array based on selected departments
    const filteredLeads = sampleLeads.filter(lead => {
        // Map lead departments to the filter department names
        let leadDepartment = '';
        switch(lead.department) {
            case 'Technology':
                leadDepartment = 'presales'; // Technology leads map to presales
                break;
            case 'Services':
                leadDepartment = 'Delivery'; // Services leads map to Delivery
                break;
            case 'Retail':
            case 'Manufacturing':
                leadDepartment = 'bd'; // Retail and Manufacturing leads map to bd
                break;
            default:
                leadDepartment = lead.department;
        }
        
        return selectedDepartments.includes(leadDepartment);
    });
    
    return filteredLeads;
}

/**
 * Create summary cards showing lead counts by status
 * @param {Array} leads - Array of lead objects
 */
function createSummaryCards(leads) {
    console.log('Creating summary cards with', leads.length, 'leads');
    
    // Calculate counts for each status
    const totalLeads = leads.length;
    const newLeads = leads.filter(lead => lead.status === 'New').length;
    const contactedLeads = leads.filter(lead => lead.status === 'Contacted').length;
    const wonLeads = leads.filter(lead => lead.status === 'Won').length;
    
    // Create HTML for summary cards
    const summaryCardsHTML = `
        <div class="summary-cards">
            <div class="summary-card">
                <h3>${totalLeads}</h3>
                <p>Total Leads</p>
            </div>
            <div class="summary-card">
                <h3>${newLeads}</h3>
                <p>New Leads</p>
            </div>
            <div class="summary-card">
                <h3>${contactedLeads}</h3>
                <p>Contacted Leads</p>
            </div>
            <div class="summary-card">
                <h3>${wonLeads}</h3>
                <p>Won Leads</p>
            </div>
        </div>
    `;
    
    // Insert summary cards into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    console.log('Dashboard content element for summary cards:', dashboardContent);
    
    if (dashboardContent) {
        // Check if summary cards already exist and update them, otherwise append
        const existingSummaryCards = dashboardContent.querySelector('.summary-cards');
        if (existingSummaryCards) {
            existingSummaryCards.outerHTML = summaryCardsHTML;
        } else {
            dashboardContent.innerHTML += summaryCardsHTML;
        }
        
        console.log('Summary cards created');
    } else {
        console.log('Dashboard content element not found for summary cards');
    }
}

/**
 * Create responsive table showing leads with columns for company, contact person, status, and source
 * @param {Array} leads - Array of lead objects
 */
function createLeadsTable(leads) {
    console.log('Creating leads table with', leads.length, 'leads');
    
    // Create table HTML
    let tableHTML = `
        <div class="leads-table-container">
            <div class="table-header">
                <h3>Leads</h3>
                <div class="sort-controls">
                    <label for="sort-status">Sort by Status:</label>
                    <select id="sort-status" onchange="sortLeads('status')">
                        <option value="">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Won">Won</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Closed">Closed</option>
                    </select>
                    
                    <label for="sort-source">Sort by Source:</label>
                    <select id="sort-source" onchange="sortLeads('source')">
                        <option value="">All</option>
                        <option value="Website">Website</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Google">Google</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Referral">Referral</option>
                    </select>
                </div>
            </div>
            <div class="table-responsive">
                <table class="leads-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Contact Person</th>
                            <th>Status</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    // Add rows for each lead
    leads.forEach(lead => {
        tableHTML += `
            <tr>
                <td>${lead.company}</td>
                <td>${lead.contactPerson}</td>
                <td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td>
                <td>${lead.source}</td>
                <td><button class="btn btn-secondary view-details-btn" data-lead-id="${lead.id}">View Details</button></td>
            </tr>
        `;
    });
    
    tableHTML += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // Insert table into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    console.log('Dashboard content element for leads table:', dashboardContent);
    
    if (dashboardContent) {
        // Check if leads table already exists and update it, otherwise append
        const existingTableContainer = dashboardContent.querySelector('.leads-table-container');
        if (existingTableContainer) {
            existingTableContainer.outerHTML = tableHTML;
        } else {
            dashboardContent.innerHTML += tableHTML;
        }
        
        // Add event listeners to the View Details buttons and status buttons
        setTimeout(() => {
            addViewDetailsEventListeners();
        }, 100);
        
        console.log('Leads table created');
    } else {
        console.log('Dashboard content element not found for leads table');
    }
}

/**
 * Sort leads by a specific field (status or source)
 * @param {string} field - Field to sort by ('status' or 'source')
 */
function sortLeads(field) {
    // Get the selected value for the field
    const selectElement = document.getElementById(`sort-${field}`);
    const selectedValue = selectElement.value;
    
    // Get filtered leads based on department selection
    let filteredLeads = filterLeadsByDepartment();
    
    // If no departments are selected, use all leads
    if (filteredLeads.length === 0) {
        filteredLeads = sampleLeads || [];
    }
    
    // Filter leads based on the selected value
    if (selectedValue) {
        filteredLeads = filteredLeads.filter(lead => lead[field] === selectedValue);
    }
    
    // Update the table with filtered leads
    updateLeadsTable(filteredLeads);
}

/**
 * Update the leads table with new data
 * @param {Array} leads - Array of lead objects to display
 */
function updateLeadsTable(leads) {
    // Get the table body element
    const tableBody = document.querySelector('.leads-table tbody');
    
    // Clear existing rows
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // Add rows for each lead
        leads.forEach(lead => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lead.company}</td>
                <td>${lead.contactPerson}</td>
                <td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td>
                <td>${lead.source}</td>
                <td><button class="btn btn-secondary view-details-btn" data-lead-id="${lead.id}">View Details</button></td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to the View Details buttons
        setTimeout(() => {
            addViewDetailsEventListeners();
        }, 100);
    }
}

/**
 * Add event listeners to all View Details buttons
 */
function addViewDetailsEventListeners() {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const leadId = parseInt(this.getAttribute('data-lead-id'));
            openLeadDetailModal(leadId);
        });
    });
}

/**
 * Update the status of a lead
 * @param {number} leadId - The ID of the lead to update
 * @param {string} newStatus - The new status to set
 */
/**
 * Show a temporary success message
 * @param {string} message - The message to display
 */
function showSuccessMessage(message) {
    // Create a temporary message element if it doesn't exist
    let messageElement = document.getElementById('status-update-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'status-update-message';
        messageElement.className = 'status-update-message';
        document.body.appendChild(messageElement);
    }
    
    // Set the message and show it
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

/**
 * Validate the lead detail form
 * @returns {boolean} - True if validation passes, false otherwise
 */
function validateLeadForm() {
    // Clear previous errors
    clearFieldErrors();
    
    const nextContactDate = document.getElementById('lead-next-contact-date').value;
    const discussionSummary = document.getElementById('lead-discussion-summary').value.trim();
    const handoverNote = document.getElementById('lead-handover-note').value.trim();
    
    // Check if department action button has been selected
    const actionButtons = document.querySelectorAll('.modal-status-btn.selected');
    const actionSelected = actionButtons.length > 0;
    
    // Validation condition a: Next contact date and discussion summary
    const conditionANextDateValid = nextContactDate && isValidFutureDate(nextContactDate);
    const conditionADiscussionValid = discussionSummary.length > 0;
    const conditionA = conditionANextDateValid && conditionADiscussionValid;
    
    // Validation condition b: Handover note and action button selected
    const conditionBHandoverValid = handoverNote.length > 0;
    const conditionB = conditionBHandoverValid && actionSelected;
    
    // Show specific errors if validation fails
    if (!conditionA && !conditionB) {
        // Show errors for condition A if partially filled
        if (nextContactDate || discussionSummary) {
            if (!conditionANextDateValid) {
                if (!nextContactDate) {
                    showFieldError('next-contact-date', 'Next Contact Date is required');
                } else {
                    showFieldError('next-contact-date', 'Next Contact Date must be a future date within one month');
                }
            }
            if (!conditionADiscussionValid) {
                showFieldError('discussion-summary', 'Discussion Summary is required');
            }
        }
        
        // Show errors for condition B if partially filled
        if (handoverNote || actionSelected) {
            if (!conditionBHandoverValid) {
                showFieldError('handover-note', 'Handover Note is required');
            }
            if (!actionSelected) {
                showFieldError('actions', 'Please select an action');
            }
        }
        
        // If nothing is filled, show general validation errors
        if (!nextContactDate && !discussionSummary && !handoverNote && !actionSelected) {
            showValidationErrors();
        }
        
        return false;
    }
    
    return true;
}

/**
 * Check if a date is a valid future date within one month
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {boolean} - True if valid future date within one month
 */
function isValidFutureDate(dateStr) {
    const inputDate = new Date(dateStr);
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    // Set time to midnight for comparison
    today.setHours(0, 0, 0, 0);
    oneMonthFromNow.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    return inputDate >= today && inputDate <= oneMonthFromNow;
}

/**
 * Show error for a specific field
 * @param {string} fieldId - Field identifier
 * @param {string} message - Error message
 */
function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Add invalid class to the field group
    const fieldGroup = document.getElementById(`${fieldId}-group`);
    if (fieldGroup) {
        fieldGroup.classList.add('invalid');
    }
}

/**
 * Clear all field errors
 */
function clearFieldErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
    
    // Remove invalid classes from field groups
    const fieldGroups = document.querySelectorAll('.form-group');
    fieldGroups.forEach(group => {
        group.classList.remove('invalid');
    });
}

/**
 * Check validation status and update UI accordingly
 */
function checkValidationStatus() {
    const cancelBtn = document.getElementById('lead-detail-cancel');
    if (cancelBtn) {
        if (validateLeadForm()) {
            cancelBtn.disabled = false;
            hideValidationErrors();
            clearFieldErrors();
        } else {
            cancelBtn.disabled = true;
        }
    }
}

/**
 * Show validation errors
 */
function showValidationErrors() {
    const errorDiv = document.getElementById('validation-errors');
    if (errorDiv) {
        errorDiv.style.display = 'block';
    }
}

/**
 * Hide validation errors
 */
function hideValidationErrors() {
    const errorDiv = document.getElementById('validation-errors');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

/**
 * Create and display the lead detail modal
 */
function createLeadDetailModal() {
    const modalHTML = `
        <div id="lead-detail-modal" class="lead-detail-modal">
            <div class="lead-detail-modal-content">
                <h2>Lead Details</h2>
                <form id="lead-detail-form">
                    <div class="form-group">
                        <label for="lead-company">Company</label>
                        <input type="text" id="lead-company" name="company" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-contact-person">Contact Person</label>
                        <input type="text" id="lead-contact-person" name="contactPerson" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-source">Source</label>
                        <input type="text" id="lead-source" name="source" readonly>
                    </div>
                    
                    <div class="form-group" id="next-contact-date-group">
                        <label for="lead-next-contact-date">Next Contact Date *</label>
                        <input type="date" id="lead-next-contact-date" name="nextContactDate">
                        <div class="field-error" id="next-contact-date-error" style="display: none; color: #e63946; font-size: 0.875rem; margin-top: 5px;"></div>
                    </div>
                    
                    <div class="form-group" id="discussion-summary-group">
                        <label for="lead-discussion-summary">Discussion Summary *</label>
                        <textarea id="lead-discussion-summary" name="discussionSummary" placeholder="Enter discussion summary..."></textarea>
                        <div class="field-error" id="discussion-summary-error" style="display: none; color: #e63946; font-size: 0.875rem; margin-top: 5px;"></div>
                    </div>
                    
                    <div class="form-group" id="handover-note-group">
                        <label for="lead-handover-note">Handover Note *</label>
                        <textarea id="lead-handover-note" name="handoverNote" placeholder="Enter handover note..."></textarea>
                        <div class="field-error" id="handover-note-error" style="display: none; color: #e63946; font-size: 0.875rem; margin-top: 5px;"></div>
                    </div>
                    
                    <!-- Department-specific Actions Section -->
                    <div class="form-group lead-actions-section">
                        <h3>Actions *</h3>
                        <div id="department-actions" class="department-actions">
                            <!-- Department-specific buttons will be added here dynamically -->
                        </div>
                        <div class="field-error" id="actions-error" style="display: none; color: #e63946; font-size: 0.875rem; margin-top: 5px;"></div>
                    </div>
                    
                    <!-- Validation Error Messages -->
                    <div id="validation-errors" class="validation-errors" style="display: none;">
                        <p>Please complete one of the following:</p>
                        <ul>
                            <li>Fill in both Next Contact Date and Discussion Summary</li>
                            <li>Fill in Handover Note and select an action</li>
                        </ul>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" id="lead-detail-cancel" class="btn btn-secondary" disabled>Cancel</button>
                        <button type="button" id="lead-detail-save-close" class="btn btn-primary">Save and Close</button>
                    </div>
                </form>
                
                <div id="lead-detail-message" class="lead-detail-message" style="display: none;">
                    <p>Lead information updated successfully!</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modal = document.getElementById('lead-detail-modal');
    const cancelBtn = document.getElementById('lead-detail-cancel');
    const saveCloseBtn = document.getElementById('lead-detail-save-close');
    const form = document.getElementById('lead-detail-form');
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (validateLeadForm()) {
                closeLeadDetailModal();
            } else {
                showValidationErrors();
            }
        });
    }
    
    if (saveCloseBtn) {
        saveCloseBtn.addEventListener('click', function() {
            if (validateLeadForm()) {
                handleLeadDetailSubmit(new Event('submit')); // Create a dummy event
                closeLeadDetailModal();
            } else {
                showValidationErrors();
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Prevent closing when clicking outside the modal
            if (e.target === modal) {
                // Don't close the modal when clicking outside
                return false;
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLeadForm()) {
                handleLeadDetailSubmit(e);
            } else {
                showValidationErrors();
            }
        });
        
        // Add input event listeners for real-time validation
        const nextContactDate = document.getElementById('lead-next-contact-date');
        const discussionSummary = document.getElementById('lead-discussion-summary');
        const handoverNote = document.getElementById('lead-handover-note');
        
        if (nextContactDate) {
            nextContactDate.addEventListener('input', checkValidationStatus);
        }
        
        if (discussionSummary) {
            discussionSummary.addEventListener('input', checkValidationStatus);
        }
        
        if (handoverNote) {
            handoverNote.addEventListener('input', checkValidationStatus);
        }
    }
}

/**
 * Open the lead detail modal with the specified lead's information
 * @param {number} leadId - The ID of the lead to display
 */
function openLeadDetailModal(leadId) {
    // Get the lead data
    const lead = sampleLeads.find(l => l.id === leadId);
    
    if (!lead) {
        console.error('Lead not found');
        return;
    }
    
    // Create the modal if it doesn't exist
    let modal = document.getElementById('lead-detail-modal');
    if (!modal) {
        createLeadDetailModal();
        modal = document.getElementById('lead-detail-modal');
    }
    
    // Populate the form with lead data
    document.getElementById('lead-company').value = lead.company || '';
    document.getElementById('lead-contact-person').value = lead.contactPerson || '';
    document.getElementById('lead-source').value = lead.source || '';
    document.getElementById('lead-next-contact-date').value = lead.nextContactDate || '';
    document.getElementById('lead-discussion-summary').value = '';
    document.getElementById('lead-handover-note').value = '';
    
    // Populate department-specific actions
    const departmentActions = document.getElementById('department-actions');
    if (departmentActions) {
        let actionButtons = '';
        switch(lead.department) {
            case 'Technology':
                // Could be Presales or Finance, let's use Presales for this example
                actionButtons = `
                    <button class="btn btn-success modal-status-btn" data-lead-id="${lead.id}" data-status="Qualified">Qualified</button>
                    <button class="btn btn-warning modal-status-btn" data-lead-id="${lead.id}" data-status="Unqualified">Unqualified</button>
                `;
                break;
            case 'Services':
                // Could be Presales or Delivery, let's use Delivery for this example
                actionButtons = `
                    <button class="btn btn-info modal-status-btn" data-lead-id="${lead.id}" data-status="Delivered">Delivered</button>
                    <button class="btn btn-secondary modal-status-btn" data-lead-id="${lead.id}" data-status="Cancelled">Cancelled</button>
                `;
                break;
            case 'Retail':
            case 'Manufacturing':
                // BD department
                actionButtons = `
                    <button class="btn btn-success modal-status-btn" data-lead-id="${lead.id}" data-status="Won">Won</button>
                    <button class="btn btn-danger modal-status-btn" data-lead-id="${lead.id}" data-status="Lost">Lost</button>
                `;
                break;
            default:
                // Default action buttons
                actionButtons = `
                    <button class="btn btn-success modal-status-btn" data-lead-id="${lead.id}" data-status="Qualified">Qualified</button>
                    <button class="btn btn-warning modal-status-btn" data-lead-id="${lead.id}" data-status="Unqualified">Unqualified</button>
                `;
        }
        departmentActions.innerHTML = actionButtons;
        
        // Add event listeners to the modal status buttons
        setTimeout(() => {
            const modalStatusButtons = document.querySelectorAll('.modal-status-btn');
            modalStatusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const leadId = parseInt(this.getAttribute('data-lead-id'));
                    const newStatus = this.getAttribute('data-status');
                    updateLeadStatusInModal(leadId, newStatus);
                });
            });
        }, 100);
        }
        
        // Hide success message and show form
        const form = document.getElementById('lead-detail-form');
        const message = document.getElementById('lead-detail-message');
        if (form) form.style.display = 'block';
        if (message) message.style.display = 'none';
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

/**
 * Update the status of a lead from the modal
 * @param {number} leadId - The ID of the lead to update
 * @param {string} newStatus - The new status to set
 */
function updateLeadStatusInModal(leadId, newStatus) {
    // Find the lead in the sample data
    const leadIndex = sampleLeads.findIndex(lead => lead.id === leadId);
    
    if (leadIndex === -1) {
        console.error('Lead not found');
        return;
    }
    
    // Update the lead's status
    sampleLeads[leadIndex].status = newStatus;
    
    // Show success message
    showSuccessMessage(`Lead status updated to ${newStatus}`);
    
    // Mark the clicked button as selected
    const clickedButton = event.target;
    if (clickedButton && clickedButton.classList.contains('modal-status-btn')) {
        // Remove selected class from all buttons
        const allButtons = document.querySelectorAll('.modal-status-btn');
        allButtons.forEach(button => button.classList.remove('selected'));
        
        // Add selected class to clicked button
        clickedButton.classList.add('selected');
    }
    
    // Check validation status
    checkValidationStatus();
}

/**
 * Close the lead detail modal
 */
function closeLeadDetailModal() {
    // Validate form before closing
    if (validateLeadForm()) {
        const modal = document.getElementById('lead-detail-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Refresh the leads table to show any updated statuses
            const filteredLeads = filterLeadsByDepartment();
            // If no departments are selected, show all leads
            const displayLeads = filteredLeads.length > 0 ? filteredLeads : sampleLeads || [];
            updateLeadsTable(displayLeads);
            
            // Also update summary cards
            createSummaryCards(displayLeads);
            
            // Hide validation errors
            hideValidationErrors();
            clearFieldErrors();
        }
    } else {
        showValidationErrors();
    }
}

/**
 * Handle lead detail form submission
 * @param {Event} e - Form submission event
 */
function handleLeadDetailSubmit(e) {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateLeadForm()) {
        return false;
    }
    
    // Get form elements
    const form = document.getElementById('lead-detail-form');
    const saveBtn = document.getElementById('lead-detail-save-close');
    const message = document.getElementById('lead-detail-message');
    
    if (!form || !saveBtn || !message) {
        console.error('Required form elements not found');
        return;
    }
    
    // Store original button text
    const originalBtnText = saveBtn.textContent;
    
    // Disable save button and show loading state
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    
    try {
        // In Experience Mode, just show a success message
        // In a real implementation, this would save to a database
        
        // Show success message
        form.style.display = 'none';
        message.style.display = 'block';
        
        // Close modal after delay and reset button
        setTimeout(() => {
            closeLeadDetailModal();
            saveBtn.disabled = false;
            saveBtn.textContent = originalBtnText;
        }, 2000);
        
    } catch (error) {
        console.error('Error saving lead details:', error);
        alert('Sorry, there was an error saving the lead details. Please try again.');
        
        // Always reset button state on error
        saveBtn.disabled = false;
        saveBtn.textContent = originalBtnText;
    }
}