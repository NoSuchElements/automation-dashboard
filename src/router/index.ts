import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Overview from '@/views/Overview.vue'
import Applications from '@/views/Applications.vue'
import Comparison from '@/views/Comparison.vue'
import Assessment from '@/views/Assessment.vue'
import KpiDashboard from '@/views/KpiDashboard.vue'
import RiskAnalysis from '@/views/RiskAnalysis.vue'
import BusinessImpact from '@/views/BusinessImpact.vue'
import Reports from '@/views/Reports.vue'
import StrategicReports from '@/views/StrategicReports.vue'
import SummaryReport from '@/views/SummaryReport.vue'
import KpiSettings from '@/views/KpiSettings.vue'
import Users from '@/views/Users.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: Overview,
      meta: { 
        title: 'Test Automation Assessment - Overview',
        section: 'Automation Trend'
      }
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
      meta: { 
        title: 'Application Portfolio Management',
        section: 'Automation Trend'
      }
    },
    {
      path: '/comparison',
      name: 'comparison',
      component: Comparison,
      meta: { 
        title: 'Interactive Application Comparison',
        section: 'Automation Trend'
      }
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: Assessment,
      meta: { 
        title: '11-Category Assessment Interface',
        section: 'Automation Trend'
      }
    },
    {
      path: '/kpi-dashboard',
      name: 'kpi-dashboard',
      component: KpiDashboard,
      meta: { 
        title: 'KPI Dashboard & Portfolio Metrics',
        section: 'Automation Trend'
      }
    },
    {
      path: '/risk-analysis',
      name: 'risk-analysis',
      component: RiskAnalysis,
      meta: { 
        title: 'Advanced Risk Analysis',
        section: 'Automation Trend'
      }
    },
    {
      path: '/business-impact',
      name: 'business-impact',
      component: BusinessImpact,
      meta: { 
        title: 'Business Impact & ROI Analysis',
        section: 'Automation Trend'
      }
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
      meta: { 
        title: 'Comprehensive Reports & Analytics',
        section: 'Automation Trend'
      }
    },
    {
      path: '/strategic-reports',
      name: 'strategic-reports',
      component: StrategicReports,
      meta: { 
        title: 'Strategic Reports',
        section: 'Strategic Dashboard'
      }
    },
    {
      path: '/summary-report',
      name: 'summary-report',
      component: SummaryReport,
      meta: { 
        title: 'Summary Report',
        section: 'Strategic Dashboard'
      }
    },
    {
      path: '/kpi-settings',
      name: 'kpi-settings',
      component: KpiSettings,
      meta: { 
        title: 'KPI Settings',
        section: 'Strategic Dashboard'
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { 
        title: 'User Management',
        section: 'User Management'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { 
        title: 'Dashboard Settings',
        section: 'User Management'
      }
    }
  ]
})

// Router navigation guard
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }
  next()
})

export default router
