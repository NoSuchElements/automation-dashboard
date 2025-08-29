<template>
  <div class="kpi-dashboard-page">
    <div class="content-header">
      <h1 class="page-title">KPI Dashboard & Portfolio Metrics</h1>
      <p class="page-subtitle">Comprehensive KPI tracking with automation excellence and quality metrics</p>
    </div>

    <div class="content">
      <!-- Portfolio Health Overview -->
      <div class="stats-grid mb-8">
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">Portfolio Health</div>
            <div class="stat-card-icon">💖</div>
          </div>
          <div class="stat-card-value">{{ portfolioHealthScore }}</div>
          <div class="stat-card-label">Overall Assessment</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">Applications</div>
            <div class="stat-card-icon">📱</div>
          </div>
          <div class="stat-card-value">{{ totalApplications }}</div>
          <div class="stat-card-label">Active Portfolio</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">Average Score</div>
            <div class="stat-card-icon">📊</div>
          </div>
          <div class="stat-card-value">{{ portfolioAverage.toFixed(1) }}/10</div>
          <div class="stat-card-label">Portfolio Rating</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">High Performers</div>
            <div class="stat-card-icon">🏆</div>
          </div>
          <div class="stat-card-value">{{ highPerformers }}</div>
          <div class="stat-card-label">Score 8+ Applications</div>
        </div>
      </div>

      <!-- Automation Excellence Metrics -->
      <div class="kpi-section mb-8">
        <h2 class="section-title">🤖 Automation Excellence Metrics</h2>

        <div class="kpi-grid">
          <div class="kpi-card card">
            <div class="card-header">
              <h3 class="card-title">
                <i class="fas fa-robot"></i>
                Automation Coverage
              </h3>
              <div class="kpi-status" :class="getStatusClass(portfolioKPIs.automationCoverage, 75)">
                {{ getStatusText(portfolioKPIs.automationCoverage, 75) }}
              </div>
            </div>
            <div class="card-body text-center">
              <div class="kpi-value">{{ portfolioKPIs.automationCoverage.toFixed(1) }}%</div>
              <div class="kpi-target">Target: >75%</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: Math.min(portfolioKPIs.automationCoverage, 100) + '%',
                    backgroundColor: getProgressColor(portfolioKPIs.automationCoverage, 75)
                  }"
                ></div>
              </div>
              <div class="progress-labels">
                <span class="progress-current">{{ portfolioKPIs.automationCoverage.toFixed(1) }}%</span>
                <span class="progress-target">75%</span>
              </div>
            </div>
          </div>

          <div class="kpi-card card">
            <div class="card-header">
              <h3 class="card-title">
                <i class="fas fa-clock"></i>
                Execution Time
              </h3>
              <div class="kpi-status" :class="getInverseStatusClass(portfolioKPIs.avgExecutionTime, 2)">
                {{ getInverseStatusText(portfolioKPIs.avgExecutionTime, 2) }}
              </div>
            </div>
            <div class="card-body text-center">
              <div class="kpi-value">{{ portfolioKPIs.avgExecutionTime.toFixed(1) }}h</div>
              <div class="kpi-target">Target: <2h</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: Math.max(0, 100 - (portfolioKPIs.avgExecutionTime / 4) * 100) + '%',
                    backgroundColor: getInverseProgressColor(portfolioKPIs.avgExecutionTime, 2)
                  }"
                ></div>
              </div>
              <div class="progress-labels">
                <span class="progress-current">{{ portfolioKPIs.avgExecutionTime.toFixed(1) }}h</span>
                <span class="progress-target">2h</span>
              </div>
            </div>
          </div>

          <div class="kpi-card card">
            <div class="card-header">
              <h3 class="card-title">
                <i class="fas fa-exclamation-triangle"></i>
                False Positive Rate
              </h3>
              <div class="kpi-status" :class="getInverseStatusClass(portfolioKPIs.falsePositiveRate, 3)">
                {{ getInverseStatusText(portfolioKPIs.falsePositiveRate, 3) }}
              </div>
            </div>
            <div class="card-body text-center">
              <div class="kpi-value">{{ portfolioKPIs.falsePositiveRate.toFixed(1) }}%</div>
              <div class="kpi-target">Target: <3%</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: Math.max(0, 100 - (portfolioKPIs.falsePositiveRate / 10) * 100) + '%',
                    backgroundColor: getInverseProgressColor(portfolioKPIs.falsePositiveRate, 3)
                  }"
                ></div>
              </div>
              <div class="progress-labels">
                <span class="progress-current">{{ portfolioKPIs.falsePositiveRate.toFixed(1) }}%</span>
                <span class="progress-target">3%</span>
              </div>
            </div>
          </div>

          <div class="kpi-card card">
            <div class="card-header">
              <h3 class="card-title">
                <i class="fas fa-tools"></i>
                Test Maintainability
              </h3>
              <div class="kpi-status" :class="getStatusClass(portfolioKPIs.testMaintainability, 7)">
                {{ getStatusText(portfolioKPIs.testMaintainability, 7) }}
              </div>
            </div>
            <div class="card-body text-center">
              <div class="kpi-value">{{ portfolioKPIs.testMaintainability.toFixed(1) }}/10</div>
              <div class="kpi-target">Target: >7</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: (portfolioKPIs.testMaintainability * 10) + '%',
                    backgroundColor: getProgressColor(portfolioKPIs.testMaintainability, 7)
                  }"
                ></div>
              </div>
              <div class="progress-labels">
                <span class="progress-current">{{ portfolioKPIs.testMaintainability.toFixed(1) }}</span>
                <span class="progress-target">7.0</span>
              </div>
            </div>
          </div>

          <div class="kpi-card card">
            <div class="card-header">
              <h3 class="card-title">
                <i class="fas fa-code"></i>
                Code Coverage
              </h3>
              <div class="kpi-status" :class="getStatusClass(portfolioKPIs.codeCoverage, 85)">
                {{ getStatusText(portfolioKPIs.codeCoverage, 85) }}
              </div>
            </div>
            <div class="card-body text-center">
              <div class="kpi-value">{{ portfolioKPIs.codeCoverage.toFixed(1) }}%</div>
              <div class="kpi-target">Target: >85%</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: portfolioKPIs.codeCoverage + '%',
                    backgroundColor: getProgressColor(portfolioKPIs.codeCoverage, 85)
                  }"
                ></div>
              </div>
              <div class="progress-labels">
                <span class="progress-current">{{ portfolioKPIs.codeCoverage.toFixed(1) }}%</span>
                <span class="progress-target">85%</span>
              </div>
            </div>
          </div>

          <div class="kpi-card card">
            <div class="card-header">
              <h3 class="card-title">
                <i class="fas fa-bug"></i>
                Defect Detection Rate
              </h3>
              <div class="kpi-status" :class="getStatusClass(portfolioKPIs.defectDetectionRate, 90)">
                {{ getStatusText(portfolioKPIs.defectDetectionRate, 90) }}
              </div>
            </div>
            <div class="card-body text-center">
              <div class="kpi-value">{{ portfolioKPIs.defectDetectionRate.toFixed(1) }}%</div>
              <div class="kpi-target">Target: >90%</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: portfolioKPIs.defectDetectionRate + '%',
                    backgroundColor: getProgressColor(portfolioKPIs.defectDetectionRate, 90)
                  }"
                ></div>
              </div>
              <div class="progress-labels">
                <span class="progress-current">{{ portfolioKPIs.defectDetectionRate.toFixed(1) }}%</span>
                <span class="progress-target">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Impact Summary -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-chart-line"></i>
            Business Impact Summary
          </h3>
        </div>
        <div class="card-body">
          <div class="business-summary-grid">
            <div class="summary-item">
              <div class="summary-icon">
                <i class="fas fa-dollar-sign"></i>
              </div>
              <div class="summary-content">
                <div class="summary-value">${{ formatCurrency(totalROI) }}</div>
                <div class="summary-label">Total Annual ROI</div>
                <div class="summary-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  12% vs last year
                </div>
              </div>
            </div>

            <div class="summary-item">
              <div class="summary-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="summary-content">
                <div class="summary-value">{{ totalTimeSaved }}h</div>
                <div class="summary-label">Monthly Time Savings</div>
                <div class="summary-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  8% improvement
                </div>
              </div>
            </div>

            <div class="summary-item">
              <div class="summary-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="summary-content">
                <div class="summary-value">{{ totalDefectsPrevented }}</div>
                <div class="summary-label">Defects Prevented</div>
                <div class="summary-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  15% increase
                </div>
              </div>
            </div>

            <div class="summary-item">
              <div class="summary-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <div class="summary-content">
                <div class="summary-value">{{ automationMaturityRate }}%</div>
                <div class="summary-label">Automation Maturity</div>
                <div class="summary-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  5% growth
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAutomationStore } from '@/stores/automation'

const automationStore = useAutomationStore()

// Computed properties with null safety
const portfolioKPIs = computed(() => automationStore.calculatePortfolioKPIs())
const totalApplications = computed(() => automationStore.applications.length)
const portfolioAverage = computed(() => automationStore.portfolioAverage)

const portfolioHealthScore = computed(() => {
  const avgScore = portfolioAverage.value
  if (avgScore >= 8.5) return 'Excellent'
  if (avgScore >= 7) return 'Good'
  if (avgScore >= 5.5) return 'Fair'
  return 'Needs Improvement'
})

const highPerformers = computed(() => 
  automationStore.applications.filter(app => app.totalScore >= 8).length
)

// Business impact calculations with null safety
const totalROI = computed(() => 
  automationStore.applications.reduce((sum, app) => sum + (app.businessMetrics?.annualROI || 0), 0)
)

const totalTimeSaved = computed(() => 
  automationStore.applications.reduce((sum, app) => sum + (app.businessMetrics?.timeSavedPerMonth || 0), 0)
)

const totalDefectsPrevented = computed(() => 
  automationStore.applications.reduce((sum, app) => sum + (app.businessMetrics?.defectsPrevented || 0), 0)
)

const automationMaturityRate = computed(() => {
  const highMaturityApps = automationStore.applications.filter(app => app.maturityLevelNumber >= 4).length
  return totalApplications.value > 0 ? Math.round((highMaturityApps / totalApplications.value) * 100) : 0
})

// Helper methods
const getStatusClass = (value: number, target: number) => {
  if (value >= target) return 'status-success'
  if (value >= target * 0.8) return 'status-warning'
  return 'status-danger'
}

const getStatusText = (value: number, target: number) => {
  if (value >= target) return 'On Target'
  if (value >= target * 0.8) return 'Near Target'
  return 'Below Target'
}

const getInverseStatusClass = (value: number, target: number) => {
  if (value <= target) return 'status-success'
  if (value <= target * 1.5) return 'status-warning'
  return 'status-danger'
}

const getInverseStatusText = (value: number, target: number) => {
  if (value <= target) return 'On Target'
  if (value <= target * 1.5) return 'Near Target'
  return 'Above Target'
}

const getProgressColor = (value: number, target: number) => {
  if (value >= target) return '#10b981'
  if (value >= target * 0.8) return '#f59e0b'
  return '#ef4444'
}

const getInverseProgressColor = (value: number, target: number) => {
  if (value <= target) return '#10b981'
  if (value <= target * 1.5) return '#f59e0b'
  return '#ef4444'
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Lifecycle
onMounted(async () => {
  if (automationStore.applications.length === 0) {
    await automationStore.loadData()
  }
})
</script>

<style scoped>
.kpi-section {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
  text-align: center;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.kpi-card {
  transition: var(--transition);
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.kpi-status {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
}

.status-warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.status-danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
}

.kpi-value {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  margin: var(--space-4) 0;
  line-height: 1;
}

.kpi-target {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.business-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.summary-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  transition: var(--transition);
}

.summary-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.summary-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.summary-content {
  flex: 1;
}

.summary-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.summary-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
}

.summary-trend {
  font-size: var(--font-size-xs);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.summary-trend.positive {
  color: var(--color-success);
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .business-summary-grid {
    grid-template-columns: 1fr;
  }

  .summary-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
