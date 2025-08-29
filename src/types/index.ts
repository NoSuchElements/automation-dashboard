// Core Application Types
export interface Application {
  id: string
  name: string
  type: string
  technology: string
  complexity: string
  criticality: string
  totalScore: number
  percentage: number
  maturityLevel: string
  maturityLevelNumber: number
  riskLevel: string
  automationROI: string
  categoryScores: Record<string, number>
  detailedMetrics: DetailedMetrics
  recommendations: string[]
  riskFactors: string[]
  businessMetrics: BusinessMetrics
}

export interface DetailedMetrics {
  testExecutionFrequency: string
  codeCoverage: number
  defectDetectionRate: number
  meanTimeToRepair: number
  automationCoverage: number
  falsePositiveRate: number
  testMaintainability: number
  businessValue: string
  teamMaturity: string
  strategicAlignment: string
}

export interface BusinessMetrics {
  annualROI: number
  timeSavedPerMonth: number
  defectsPrevented: number
  costPerDefect: number
}

// Metrics Configuration Types
export interface Category {
  name: string
  weight: number
  description: string
  icon: string
}

export interface MaturityLevel {
  level: number
  name: string
  description: string
  characteristics: string[]
  scoreRange: {
    min: number
    max: number
  }
}

export interface MetricsConfiguration {
  categories: Category[]
  maturityModel: {
    levels: MaturityLevel[]
  }
}

// KPI Types
export interface PortfolioKPIs {
  automationCoverage: number
  avgExecutionTime: number
  falsePositiveRate: number
  testMaintainability: number
  defectDetectionRate: number
  codeCoverage: number
  meanTimeToDetection: number
  qualityGatePassRate: number
}

// Chart Data Types
export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  borderRadius?: number
  tension?: number
  pointBackgroundColor?: string | string[]
  pointBorderColor?: string | string[]
  pointRadius?: number
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

// Filter Types
export interface FilterState {
  type: string
  criticality: string
  maturityLevel: string
  riskLevel: string
  automationROI: string
  complexity: string
  searchTerm: string
}

// Category Score Interface
export interface CategoryScore {
  name: string
  score: number
}
