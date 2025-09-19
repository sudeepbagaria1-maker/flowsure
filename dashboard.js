// dashboard.js - Dashboard functionality for Flowsure CRM
// This file contains functions to populate the dashboard with sample data and handle user interactions

/**
 * Initialize the dashboard when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Populate the dashboard with sample data
    populateDashboard();
});

/**
 * Populate the dashboard with sample data from data.js
 * This function creates a welcome message, summary cards, and the leads table
 */
function populateDashboard() {
    // Get the sample leads data
    const leads = sampleLeads || [];
    
    // Create welcome message
    createWelcomeMessage();
    
    // Create summary cards
    createSummaryCards(leads);
    
    // Create leads table
    createLeadsTable(leads);
}

/**
 * Create a welcome message section
 */
function createWelcomeMessage() {
    const welcomeHTML = `
        <div class="welcome-message">
            <h2>CRM Dashboard</h2>
            <p>Welcome to your customer management experience</p>
        </div>
    `;
    
    // Insert welcome message into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        dashboardContent.innerHTML = welcomeHTML;
    }
}

/**
 * Create summary cards showing lead counts by status
 * @param {Array} leads - Array of lead objects
 */
function createSummaryCards(leads) {
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
    if (dashboardContent) {
        dashboardContent.innerHTML += summaryCardsHTML;
    }
}

/**
 * Create responsive table showing leads with columns for company, contact person, status, and source
 * @param {Array} leads - Array of lead objects
 */
function createLeadsTable(leads) {
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
    if (dashboardContent) {
        dashboardContent.innerHTML += tableHTML;
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
    
    // Filter leads based on the selected value
    let filteredLeads = sampleLeads || [];
    
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
            `;
            tableBody.appendChild(row);
        });
    }
}