<template>
  <div class="overview-page">
    <!-- Page Header -->
    <div class="content-header">
      <h1 class="page-title">Test Automation Assessment Overview</h1>
      <p class="page-subtitle">Comprehensive portfolio analysis with 11-category framework assessment and key performance indicators</p>
    </div>

    <div class="content">
      <!-- Portfolio Statistics -->
      <div class="stats-grid mb-8">
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">Portfolio Average Score</div>
            <div class="stat-card-icon">📊</div>
          </div>
          <div class="stat-card-value">{{ portfolioAverage.toFixed(1) }}/10</div>
          <div class="stat-card-label">Overall Maturity Rating</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">High Maturity Apps</div>
            <div class="stat-card-icon">🏆</div>
          </div>
          <div class="stat-card-value">{{ highMaturityCount }}</div>
          <div class="stat-card-label">Level 4+ Applications</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">High Risk Applications</div>
            <div class="stat-card-icon">⚠️</div>
          </div>
          <div class="stat-card-value">{{ highRiskCount }}</div>
          <div class="stat-card-label">Requiring Attention</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-card-title">Total Applications</div>
            <div class="stat-card-icon">📱</div>
          </div>
          <div class="stat-card-value">{{ totalApplications }}</div>
          <div class="stat-card-label">Active Portfolio</div>
        </div>
      </div>

      <!-- 11-Category Framework Overview -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="card-title">
            🎯 11-Category Assessment Framework
          </h3>
        </div>
        <div class="card-body">
          <div class="framework-grid">
            <div v-for="category in categories" :key="category.name" class="framework-item">
              <div class="framework-icon">
                <i :class="category.icon"></i>
              </div>
              <div class="framework-content">
                <div class="framework-title">{{ category.name }}</div>
                <div class="framework-weight">{{ category.weight }}% Weight</div>
                <div class="framework-description">{{ category.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid">
        <!-- Application Scores Chart -->
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              📊 Application Scores Ranking
            </h3>
          </div>
          <div class="chart-body">
            <Bar v-if="applicationScoresData" :data="applicationScoresData" :options="barChartOptions" />
            <div v-else class="loading">
              <div class="loading-spinner"></div>
              Loading chart data...
            </div>
          </div>
        </div>

        <!-- Maturity Distribution Chart -->
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              🎯 Maturity Level Distribution
            </h3>
          </div>
          <div class="chart-body">
            <Doughnut v-if="maturityDistributionData" :data="maturityDistributionData" :options="doughnutChartOptions" />
            <div v-else class="loading">
              <div class="loading-spinner"></div>
              Loading chart data...
            </div>
          </div>
        </div>

        <!-- Portfolio Radar Chart -->
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              🎯 Top Applications Comparison
            </h3>
          </div>
          <div class="chart-body">
            <Radar v-if="portfolioRadarData" :data="portfolioRadarData" :options="radarChartOptions" />
            <div v-else class="loading">
              <div class="loading-spinner"></div>
              Loading chart data...
            </div>
          </div>
        </div>

        <!-- Category Analysis Chart -->
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              📈 Average Scores by Category
            </h3>
          </div>
          <div class="chart-body">
            <Bar v-if="categoryAnalysisData" :data="categoryAnalysisData" :options="barChartOptions" />
            <div v-else class="loading">
              <div class="loading-spinner"></div>
              Loading chart data...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Bar, Doughnut, Radar } from 'vue-chartjs'
import { useAutomationStore } from '@/stores/automation'
import { 
  chartColors, 
  maturityColors, 
  defaultChartOptions, 
  radarChartOptions,
  doughnutChartOptions
} from '@/utils/chartUtils'

const automationStore = useAutomationStore()

// Computed properties
const applications = computed(() => automationStore.sortedApplicationsByScore)
const categories = computed(() => automationStore.metricsConfiguration?.categories || [])
const portfolioAverage = computed(() => automationStore.portfolioAverage)
const totalApplications = computed(() => automationStore.applications.length)

const highMaturityCount = computed(() => 
  applications.value.filter(app => app.maturityLevelNumber >= 4).length
)

const highRiskCount = computed(() => 
  applications.value.filter(app => app.riskLevel === 'High' || app.riskLevel === 'Very High').length
)

// Chart data
const applicationScoresData = computed(() => {
  if (applications.value.length === 0) return null

  return {
    labels: applications.value.map(app => app.name),
    datasets: [{
      label: 'Total Score',
      data: applications.value.map(app => app.totalScore),
      backgroundColor: applications.value.map((app, index) => chartColors[index % chartColors.length] + '80'),
      borderColor: applications.value.map((app, index) => chartColors[index % chartColors.length]),
      borderWidth: 2,
      borderRadius: 8
    }]
  }
})

const maturityDistributionData = computed(() => {
  const distribution = automationStore.maturityDistribution
  const levels = Object.keys(distribution)

  if (levels.length === 0) return null

  return {
    labels: levels,
    datasets: [{
      data: Object.values(distribution),
      backgroundColor: levels.map(level => maturityColors[level] + '80'),
      borderColor: levels.map(level => maturityColors[level]),
      borderWidth: 2
    }]
  }
})

const portfolioRadarData = computed(() => {
  const topApps = applications.value.slice(0, 2)
  if (topApps.length === 0 || categories.value.length === 0) return null

  return {
    labels: categories.value.map(cat => cat.name),
    datasets: topApps.map((app, index) => ({
      label: app.name,
      data: categories.value.map(cat => app.categoryScores[cat.name] || 0),
      backgroundColor: chartColors[index] + '20',
      borderColor: chartColors[index],
      borderWidth: 3,
      pointBackgroundColor: chartColors[index],
      pointBorderColor: '#fff',
      pointRadius: 6
    }))
  }
})

const categoryAnalysisData = computed(() => {
  if (applications.value.length === 0 || categories.value.length === 0) return null

  const categoryAverages = categories.value.map(category => {
    const total = applications.value.reduce((sum, app) => sum + (app.categoryScores[category.name] || 0), 0)
    return total / applications.value.length
  })

  return {
    labels: categories.value.map(cat => cat.name),
    datasets: [{
      label: 'Average Score',
      data: categoryAverages,
      backgroundColor: categoryAverages.map((score, index) => chartColors[index % chartColors.length] + '80'),
      borderColor: categoryAverages.map((score, index) => chartColors[index % chartColors.length]),
      borderWidth: 2,
      borderRadius: 8
    }]
  }
})

// Chart options
const barChartOptions = computed(() => ({
  ...defaultChartOptions,
  scales: {
    ...defaultChartOptions.scales,
    y: {
      ...defaultChartOptions.scales.y,
      max: 10
    }
  }
}))

// Lifecycle
onMounted(async () => {
  await automationStore.loadData()
})
</script>

<style scoped>
.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-4);
}

.framework-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.framework-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--color-primary);
}

.framework-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-2xl);
  flex-shrink: 0;
}

.framework-content {
  flex: 1;
}

.framework-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.framework-weight {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.framework-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .framework-grid {
    grid-template-columns: 1fr;
  }

  .framework-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
