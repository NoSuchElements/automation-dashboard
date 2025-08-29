import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  Application, 
  PortfolioKPIs, 
  MetricsConfiguration,
  FilterState
} from '@/types'
import applicationsData from '@/data/applications_data.json'
import metricsConfiguration from '@/data/metrics_configuration.json'

export const useAutomationStore = defineStore('automation', () => {
  // State
  const applications = ref<Application[]>(applicationsData.applications as Application[])
  const metricsConfig = ref<MetricsConfiguration>(metricsConfiguration as MetricsConfiguration)
  const filters = ref<FilterState>({
    type: '',
    criticality: '',
    maturityLevel: '',
    riskLevel: '',
    automationROI: '',
    complexity: '',
    searchTerm: ''
  })
  const isLoading = ref(false)

  // Basic computed properties
  const sortedApplicationsByScore = computed(() => 
    [...applications.value].sort((a, b) => b.totalScore - a.totalScore)
  )

  const portfolioAverage = computed(() => {
    if (applications.value.length === 0) return 0
    return applications.value.reduce((sum, app) => sum + app.totalScore, 0) / applications.value.length
  })

  // Distribution computations
  const maturityDistribution = computed(() => {
    const distribution: Record<string, number> = {}
    applications.value.forEach(app => {
      const level = app.maturityLevel
      distribution[level] = (distribution[level] || 0) + 1
    })
    return distribution
  })

  const riskDistribution = computed(() => {
    const distribution: Record<string, number> = {}
    applications.value.forEach(app => {
      const risk = app.riskLevel
      distribution[risk] = (distribution[risk] || 0) + 1
    })
    return distribution
  })

  const roiDistribution = computed(() => {
    const distribution: Record<string, number> = {}
    applications.value.forEach(app => {
      const roi = app.automationROI
      distribution[roi] = (distribution[roi] || 0) + 1
    })
    return distribution
  })

  const typeDistribution = computed(() => {
    const distribution: Record<string, number> = {}
    applications.value.forEach(app => {
      const type = app.type
      distribution[type] = (distribution[type] || 0) + 1
    })
    return distribution
  })

  // Filtered applications
  const filteredApplications = computed(() => {
    return applications.value.filter(app => {
      const matchesType = !filters.value.type || app.type === filters.value.type
      const matchesCriticality = !filters.value.criticality || app.criticality === filters.value.criticality
      const matchesMaturity = !filters.value.maturityLevel || app.maturityLevel === filters.value.maturityLevel
      const matchesRisk = !filters.value.riskLevel || app.riskLevel === filters.value.riskLevel
      const matchesROI = !filters.value.automationROI || app.automationROI === filters.value.automationROI
      const matchesComplexity = !filters.value.complexity || app.complexity === filters.value.complexity
      const matchesSearch = !filters.value.searchTerm || 
        app.name.toLowerCase().includes(filters.value.searchTerm.toLowerCase()) ||
        app.technology.toLowerCase().includes(filters.value.searchTerm.toLowerCase())

      return matchesType && matchesCriticality && matchesMaturity && 
             matchesRisk && matchesROI && matchesComplexity && matchesSearch
    })
  })

  // High priority applications
  const highMaturityApplications = computed(() => 
    applications.value.filter(app => app.maturityLevelNumber >= 4)
  )

  const highRiskApplications = computed(() => 
    applications.value.filter(app => app.riskLevel === 'High' || app.riskLevel === 'Very High')
  )

  const criticalApplications = computed(() => 
    applications.value.filter(app => app.criticality === 'Critical')
  )

  // Category analysis
  const categoryAverages = computed(() => {
    if (applications.value.length === 0) return {}

    const averages: Record<string, number> = {}
    const categories = metricsConfig.value.categories

    categories.forEach(category => {
      const total = applications.value.reduce((sum, app) => 
        sum + (app.categoryScores[category.name] || 0), 0)
      averages[category.name] = total / applications.value.length
    })

    return averages
  })

  // KPI Calculations with complete null safety
  const calculatePortfolioKPIs = (): PortfolioKPIs => {
    if (applications.value.length === 0) {
      return {
        automationCoverage: 0,
        avgExecutionTime: 0,
        falsePositiveRate: 0,
        testMaintainability: 0,
        defectDetectionRate: 0,
        codeCoverage: 0,
        meanTimeToDetection: 0,
        qualityGatePassRate: 0
      }
    }

    const totalApps = applications.value.length

    const avgAutomationCoverage = applications.value.reduce((sum, app) => 
      sum + (app.detailedMetrics?.automationCoverage || 0), 0) / totalApps

    const avgExecutionTime = applications.value.reduce((sum, app) => 
      sum + (app.detailedMetrics?.meanTimeToRepair || 0), 0) / totalApps

    const avgFalsePositiveRate = applications.value.reduce((sum, app) => 
      sum + (app.detailedMetrics?.falsePositiveRate || 0), 0) / totalApps

    const avgTestMaintainability = applications.value.reduce((sum, app) => 
      sum + (app.detailedMetrics?.testMaintainability || 0), 0) / totalApps

    const avgDefectDetection = applications.value.reduce((sum, app) => 
      sum + (app.detailedMetrics?.defectDetectionRate || 0), 0) / totalApps

    const avgCodeCoverage = applications.value.reduce((sum, app) => 
      sum + (app.detailedMetrics?.codeCoverage || 0), 0) / totalApps

    const avgMeanTimeToDetection = avgExecutionTime * 8
    const qualityGatePassRate = Math.max(0, 100 - avgFalsePositiveRate * 5)

    return {
      automationCoverage: Math.round(avgAutomationCoverage * 10) / 10,
      avgExecutionTime: Math.round(avgExecutionTime * 10) / 10,
      falsePositiveRate: Math.round(avgFalsePositiveRate * 10) / 10,
      testMaintainability: Math.round(avgTestMaintainability * 10) / 10,
      defectDetectionRate: Math.round(avgDefectDetection * 10) / 10,
      codeCoverage: Math.round(avgCodeCoverage * 10) / 10,
      meanTimeToDetection: Math.round(avgMeanTimeToDetection * 10) / 10,
      qualityGatePassRate: Math.round(qualityGatePassRate * 10) / 10
    }
  }

  // Actions
  const loadData = async () => {
    isLoading.value = true
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100))
      return Promise.resolve()
    } finally {
      isLoading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<FilterState>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      type: '',
      criticality: '',
      maturityLevel: '',
      riskLevel: '',
      automationROI: '',
      complexity: '',
      searchTerm: ''
    }
  }

  const getApplicationById = (id: string) => {
    return applications.value.find(app => app.id === id)
  }

  return {
    // State
    applications,
    metricsConfiguration: metricsConfig,
    filters,
    isLoading,

    // Basic computed
    sortedApplicationsByScore,
    filteredApplications,
    portfolioAverage,

    // Distributions
    maturityDistribution,
    riskDistribution,
    roiDistribution,
    typeDistribution,

    // Analysis
    highMaturityApplications,
    highRiskApplications,
    criticalApplications,
    categoryAverages,

    // Calculations
    calculatePortfolioKPIs,

    // Actions
    loadData,
    updateFilters,
    clearFilters,
    getApplicationById
  }
})
