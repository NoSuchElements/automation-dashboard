<template>
  <div class="applications-page">
    <div class="content-header">
      <h1 class="page-title">Application Portfolio Management</h1>
      <p class="page-subtitle">Comprehensive application portfolio with detailed assessment cards and filtering capabilities</p>
    </div>

    <div class="content">
      <!-- Filter Section -->
      <div class="card mb-6">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-filter"></i>
            Filter & Search Applications
          </h3>
          <button @click="clearFilters" class="btn btn-outline btn-sm">
            Clear All
          </button>
        </div>
        <div class="card-body">
          <div class="filter-grid">
            <div class="filter-group">
              <label for="search" class="filter-label">Search</label>
              <input 
                id="search"
                v-model="filters.searchTerm"
                type="text"
                placeholder="Search by name or technology..."
                class="filter-input"
              >
            </div>

            <div class="filter-group">
              <label for="type" class="filter-label">Application Type</label>
              <select id="type" v-model="filters.type" class="filter-select">
                <option value="">All Types</option>
                <option v-for="type in filterOptions.types" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label for="criticality" class="filter-label">Criticality</label>
              <select id="criticality" v-model="filters.criticality" class="filter-select">
                <option value="">All Criticality</option>
                <option v-for="crit in filterOptions.criticalities" :key="crit" :value="crit">
                  {{ crit }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label for="risk" class="filter-label">Risk Level</label>
              <select id="risk" v-model="filters.riskLevel" class="filter-select">
                <option value="">All Risk Levels</option>
                <option v-for="risk in filterOptions.riskLevels" :key="risk" :value="risk">
                  {{ risk }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label for="maturity" class="filter-label">Maturity Level</label>
              <select id="maturity" v-model="filters.maturityLevel" class="filter-select">
                <option value="">All Maturity Levels</option>
                <option v-for="maturity in filterOptions.maturityLevels" :key="maturity" :value="maturity">
                  {{ maturity }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label for="roi" class="filter-label">Automation ROI</label>
              <select id="roi" v-model="filters.automationROI" class="filter-select">
                <option value="">All ROI Levels</option>
                <option v-for="roi in filterOptions.roiLevels" :key="roi" :value="roi">
                  {{ roi }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="results-summary mb-6">
        <div class="summary-stats">
          <div class="stat">
            <span class="stat-value">{{ filteredApplications.length }}</span>
            <span class="stat-label">Applications Found</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ averageScore.toFixed(1) }}/10</span>
            <span class="stat-label">Average Score</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ highPerformers }}</span>
            <span class="stat-label">High Performers (8+)</span>
          </div>
        </div>
      </div>

      <!-- Applications Grid -->
      <div class="applications-grid">
        <div 
          v-for="app in filteredApplications" 
          :key="app.id"
          class="application-card card"
        >
          <div class="card-header">
            <div class="app-header-main">
              <h3 class="app-title">{{ app.name }}</h3>
              <div class="app-badges">
                <span class="badge" :class="getMaturityClass(app.maturityLevel)">
                  {{ getMaturityShort(app.maturityLevel) }}
                </span>
                <span class="badge" :class="getRiskClass(app.riskLevel)">
                  {{ app.riskLevel }}
                </span>
              </div>
            </div>
            <div class="app-score">
              <div class="score-value">{{ app.totalScore.toFixed(1) }}</div>
              <div class="score-max">/10</div>
            </div>
          </div>

          <div class="card-body">
            <div class="app-meta">
              <div class="meta-item">
                <i class="fas fa-laptop-code"></i>
                <span>{{ app.type }}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-cogs"></i>
                <span>{{ app.technology }}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-layer-group"></i>
                <span>{{ app.complexity }}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-exclamation-triangle"></i>
                <span>{{ app.criticality }}</span>
              </div>
            </div>

            <!-- Category Scores -->
            <div class="category-scores">
              <h4 class="section-title">Category Performance</h4>
              <div class="score-bars">
                <div 
                  v-for="categoryScore in getTopCategoriesArray(app)" 
                  :key="categoryScore.name"
                  class="score-bar-item"
                >
                  <div class="score-bar-header">
                    <span class="category-name">{{ categoryScore.name }}</span>
                    <span class="category-score">{{ categoryScore.score.toFixed(1) }}</span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ 
                        width: (categoryScore.score * 10) + '%',
                        backgroundColor: getScoreColor(categoryScore.score)
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Key Metrics -->
            <div class="key-metrics">
              <h4 class="section-title">Key Metrics</h4>
              <div class="metrics-grid">
                <div class="metric">
                  <div class="metric-value">{{ app.detailedMetrics.automationCoverage }}%</div>
                  <div class="metric-label">Automation Coverage</div>
                </div>
                <div class="metric">
                  <div class="metric-value">{{ app.detailedMetrics.codeCoverage }}%</div>
                  <div class="metric-label">Code Coverage</div>
                </div>
                <div class="metric">
                  <div class="metric-value">{{ app.detailedMetrics.falsePositiveRate }}%</div>
                  <div class="metric-label">False Positive Rate</div>
                </div>
                <div class="metric">
                  <div class="metric-value">{{ app.detailedMetrics.meanTimeToRepair }}h</div>
                  <div class="metric-label">Mean Time to Repair</div>
                </div>
              </div>
            </div>

            <!-- Business Impact -->
            <div class="business-impact">
              <h4 class="section-title">Business Impact</h4>
              <div class="impact-stats">
                <div class="impact-item">
                  <i class="fas fa-dollar-sign"></i>
                  <div class="impact-content">
                    <div class="impact-value">${{ formatNumber(app.businessMetrics.annualROI) }}</div>
                    <div class="impact-label">Annual ROI</div>
                  </div>
                </div>
                <div class="impact-item">
                  <i class="fas fa-clock"></i>
                  <div class="impact-content">
                    <div class="impact-value">{{ app.businessMetrics.timeSavedPerMonth }}h</div>
                    <div class="impact-label">Time Saved/Month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="roi-indicator">
              <i class="fas fa-chart-line"></i>
              <span>{{ app.automationROI }} ROI</span>
            </div>
            <button class="btn btn-outline btn-sm">
              <i class="fas fa-eye"></i>
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredApplications.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-search"></i>
        </div>
        <h3>No Applications Found</h3>
        <p>Try adjusting your filters to see more results.</p>
        <button @click="clearFilters" class="btn btn-primary">
          Clear All Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useAutomationStore } from '@/stores/automation'
import type { Application, CategoryScore } from '@/types'

const automationStore = useAutomationStore()

// Local state for filters
const filters = reactive({
  searchTerm: '',
  type: '',
  criticality: '',
  maturityLevel: '',
  riskLevel: '',
  automationROI: '',
  complexity: ''
})

// Computed properties
const filteredApplications = computed(() => {
  return automationStore.applications.filter(app => {
    const matchesSearch = !filters.searchTerm || 
      app.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      app.technology.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesType = !filters.type || app.type === filters.type
    const matchesCriticality = !filters.criticality || app.criticality === filters.criticality
    const matchesMaturity = !filters.maturityLevel || app.maturityLevel === filters.maturityLevel
    const matchesRisk = !filters.riskLevel || app.riskLevel === filters.riskLevel
    const matchesROI = !filters.automationROI || app.automationROI === filters.automationROI

    return matchesSearch && matchesType && matchesCriticality && 
           matchesMaturity && matchesRisk && matchesROI
  }).sort((a, b) => b.totalScore - a.totalScore)
})

const filterOptions = computed(() => {
  const apps = automationStore.applications
  return {
    types: [...new Set(apps.map(app => app.type))],
    criticalities: [...new Set(apps.map(app => app.criticality))],
    maturityLevels: [...new Set(apps.map(app => app.maturityLevel))],
    riskLevels: [...new Set(apps.map(app => app.riskLevel))],
    roiLevels: [...new Set(apps.map(app => app.automationROI))]
  }
})

const averageScore = computed(() => {
  if (filteredApplications.value.length === 0) return 0
  return filteredApplications.value.reduce((sum, app) => sum + app.totalScore, 0) / filteredApplications.value.length
})

const highPerformers = computed(() => 
  filteredApplications.value.filter(app => app.totalScore >= 8).length
)

// Helper methods
const getMaturityClass = (level: string) => {
  const levelNum = parseInt(level.split(':')[0].replace('Level ', ''))
  if (levelNum >= 5) return 'badge-success'
  if (levelNum >= 4) return 'badge-info'
  if (levelNum >= 3) return 'badge-warning'
  return 'badge-danger'
}

const getMaturityShort = (level: string) => {
  return level.split(':')[0]
}

const getRiskClass = (risk: string) => {
  switch (risk) {
    case 'Very High': return 'badge-danger'
    case 'High': return 'badge-warning'
    case 'Medium': return 'badge-info'
    case 'Low': return 'badge-success'
    case 'Very Low': return 'badge-success'
    default: return 'badge-secondary'
  }
}

// FIXED: Return properly typed CategoryScore array
const getTopCategoriesArray = (app: Application): CategoryScore[] => {
  return Object.entries(app.categoryScores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

const getScoreColor = (score: number): string => {
  if (score >= 8) return '#10b981'
  if (score >= 6) return '#f59e0b'
  if (score >= 4) return '#ef4444'
  return '#dc2626'
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num)
}

const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    (filters as any)[key] = ''
  })
}

// Lifecycle
onMounted(async () => {
  if (automationStore.applications.length === 0) {
    await automationStore.loadData()
  }
})
</script>

<style scoped>
.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.filter-input,
.filter-select {
  padding: var(--space-3);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  font-size: var(--font-size-sm);
  transition: var(--transition);
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(31, 184, 205, 0.1);
}

.results-summary {
  display: flex;
  justify-content: center;
}

.summary-stats {
  display: flex;
  gap: var(--space-8);
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-6);
}

.application-card {
  transition: var(--transition);
}

.application-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.app-header-main {
  flex: 1;
}

.app-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.app-badges {
  display: flex;
  gap: var(--space-2);
}

.app-score {
  display: flex;
  align-items: baseline;
  color: var(--color-primary);
  font-weight: 700;
}

.score-value {
  font-size: var(--font-size-2xl);
  line-height: 1;
}

.score-max {
  font-size: var(--font-size-base);
  opacity: 0.7;
  margin-left: 2px;
}

.app-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.meta-item i {
  width: 16px;
  color: var(--color-primary);
}

.section-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.score-bar-item {
  margin-bottom: var(--space-3);
}

.score-bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-1);
}

.category-name {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.category-score {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-primary);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.metric {
  text-align: center;
}

.metric-value {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}

.metric-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.impact-stats {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
}

.impact-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
}

.impact-item i {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-sm);
}

.impact-value {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
}

.impact-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.roi-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: var(--space-16);
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  color: var(--color-primary);
  margin-bottom: var(--space-6);
}

.empty-state h3 {
  margin: 0 0 var(--space-3) 0;
  color: var(--text-primary);
}

.empty-state p {
  margin-bottom: var(--space-6);
}

@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }

  .summary-stats {
    flex-direction: column;
    gap: var(--space-4);
  }

  .applications-grid {
    grid-template-columns: 1fr;
  }

  .app-meta {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .impact-stats {
    flex-direction: column;
  }
}
</style>
