<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <i class="fas fa-chart-line"></i>
        <span class="logo-text">AutoDashboard</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-title">
          <i class="fas fa-chart-line"></i>
          <span>Automation Trend</span>
        </div>

        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="fas fa-home"></i>
              <span>Overview</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/applications" class="nav-link">
              <i class="fas fa-th-large"></i>
              <span>Applications</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/comparison" class="nav-link">
              <i class="fas fa-balance-scale"></i>
              <span>Comparison</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/assessment" class="nav-link">
              <i class="fas fa-clipboard-check"></i>
              <span>Assessment</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/kpi-dashboard" class="nav-link">
              <i class="fas fa-tachometer-alt"></i>
              <span>KPI Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/risk-analysis" class="nav-link">
              <i class="fas fa-shield-alt"></i>
              <span>Risk Analysis</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/business-impact" class="nav-link">
              <i class="fas fa-dollar-sign"></i>
              <span>Business Impact</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/reports" class="nav-link">
              <i class="fas fa-file-alt"></i>
              <span>Reports</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <div class="nav-section-title">
          <i class="fas fa-chart-bar"></i>
          <span>Strategic Dashboard</span>
        </div>

        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/strategic-reports" class="nav-link">
              <i class="fas fa-chart-bar"></i>
              <span>Strategic Reports</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/summary-report" class="nav-link">
              <i class="fas fa-file-contract"></i>
              <span>Summary Report</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/kpi-settings" class="nav-link">
              <i class="fas fa-cog"></i>
              <span>KPI Settings</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <div class="nav-section-title">
          <i class="fas fa-users-cog"></i>
          <span>User Management</span>
        </div>

        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/users" class="nav-link">
              <i class="fas fa-users"></i>
              <span>Users</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/settings" class="nav-link">
              <i class="fas fa-sliders-h"></i>
              <span>Settings</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// No script needed for static sidebar
</script>

<style scoped>
.sidebar-nav {
  flex: 1;
  padding: var(--space-4) 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: var(--space-6);
}

.nav-section-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: var(--space-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  color: #cbd5e1;
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-link:hover {
  background-color: #1e293b;
  color: var(--color-primary);
}

.nav-link.router-link-active {
  background-color: #1e293b;
  color: var(--color-primary);
}

.nav-link.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--color-primary);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.sidebar-header {
  padding: var(--space-6);
  border-bottom: 1px solid #1e293b;
}
</style>
