import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, 
  Calculator, 
  Database, 
  Settings, 
  BarChart3,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Layers,
  Wrench,
  RefreshCw,
  Plus,
  X,
  ExternalLink,
  Loader,
  Save,
  Edit2,
  Trash2,
  Check,
  Grid,
  Box,
  Maximize2,
  Upload,
  Copy
} from 'lucide-react';

// ============================================
// CONFIGURATION - UPDATE THIS AFTER DEPLOYING
// ============================================
const API_URL = 'https://script.google.com/a/macros/fourmilebay.com/s/AKfycbxue-k99jGzxbHPnS2Mq1uKB5OASkFSRWjFxSO4aJy1dXjgyVRzQP7aXgCOBjN7lrM6ZQ/exec';
// ============================================

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check connection on load
    checkConnection();
  }, []);

const checkConnection = async () => {
    if (API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
      setIsConnected(false);
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(API_URL + '?action=getStats', {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success) {
        setIsConnected(true);
      } else {
        console.error('API returned error:', data);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1a73e8' }}>
            FourMileBay
          </h1>
          <p style={{ fontSize: '12px', color: '#5f6368', marginTop: '4px' }}>
            Manufacturing Intelligence v5.1.0
          </p>
        </div>

        <nav>
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="BOM Creator" 
            active={activeTab === 'bom'}
            onClick={() => setActiveTab('bom')}
          />
          <NavItem 
            icon={<Calculator size={20} />} 
            label="Cost Analysis" 
            active={activeTab === 'cost'}
            onClick={() => setActiveTab('cost')}
          />
          <NavItem 
            icon={<Wrench size={20} />} 
            label="Profile Registry" 
            active={activeTab === 'profiles'}
            onClick={() => setActiveTab('profiles')}
          />
          <NavItem 
            icon={<Database size={20} />} 
            label="Materials Library" 
            active={activeTab === 'materials'}
            onClick={() => setActiveTab('materials')}
          />
          <NavItem 
            icon={<Package size={20} />} 
            label="Products" 
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          />
          <NavItem 
            icon={<Grid size={20} />} 
            label="Taxonomy Library" 
            active={activeTab === 'taxonomy'}
            onClick={() => setActiveTab('taxonomy')}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ fontSize: '12px', color: '#5f6368' }}>
            Google Sheets Connection
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            {isLoading ? (
              <Loader size={14} className="spinner" />
            ) : (
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: isConnected ? '#34a853' : '#ea4335' 
              }}></div>
            )}
            <span style={{ fontSize: '12px', color: isConnected ? '#34a853' : '#ea4335' }}>
              {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {!isConnected && !isLoading && <ConnectionWarning />}
        {activeTab === 'dashboard' && <Dashboard apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'bom' && <BOMCreator apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'cost' && <CostAnalysis apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'profiles' && <ProfileRegistry apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'materials' && <MaterialsLibrary apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'products' && <ProductsList apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'taxonomy' && <TaxonomyLibrary apiUrl={API_URL} isConnected={isConnected} />}
        {activeTab === 'settings' && <SettingsPage apiUrl={API_URL} />}
      </main>
    </div>
  );
}

// Connection Warning Component
function ConnectionWarning() {
  return (
    <div style={{ 
      background: '#fff3cd', 
      border: '1px solid #ffc107', 
      borderRadius: '8px', 
      padding: '16px', 
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    }}>
      <AlertTriangle size={24} color="#856404" />
      <div>
        <strong style={{ color: '#856404' }}>Google Sheets Not Connected</strong>
        <p style={{ fontSize: '14px', color: '#856404', marginTop: '4px' }}>
          To connect to your live data, you need to deploy the Google Apps Script as a Web App 
          and update the API_URL in the React code. See Settings tab for instructions.
        </p>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Dashboard Component - NOW WITH LIVE DATA
function Dashboard({ apiUrl, isConnected }) {
  const [stats, setStats] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!isConnected) {
      setLoading(false);
      return;
    }
    
    try {
      // Fetch stats
      const statsRes = await fetch(`${apiUrl}?action=getStats`);
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }
      
      // Fetch recent products
      const productsRes = await fetch(`${apiUrl}?action=getRecentProducts&limit=5`);
      const productsData = await productsRes.json();
      if (productsData.success) {
        setRecentProducts(productsData.products);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  }, [apiUrl, isConnected]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Default stats for demo mode
  const displayStats = stats || {
    totalProducts: 0,
    productsThisWeek: 0,
    avgVariance: 0,
    standardisationScore: 0
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Dashboard</h2>
        {isConnected && (
          <button className="btn btn-secondary" onClick={fetchData} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spinner' : ''} />
            Refresh
          </button>
        )}
      </div>
      
      {/* Stats Grid */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard 
          icon={<Package />}
          value={displayStats.totalProducts}
          label="Total Products"
          color="#1a73e8"
          loading={loading}
        />
        <StatCard 
          icon={<Clock />}
          value={displayStats.productsThisWeek}
          label="Costed This Week"
          color="#34a853"
          loading={loading}
        />
        <StatCard 
          icon={<BarChart3 />}
          value={`${displayStats.avgVariance}%`}
          label="Avg Variance"
          color={parseFloat(displayStats.avgVariance) <= 10 ? '#34a853' : '#ea4335'}
          loading={loading}
        />
        <StatCard 
          icon={<Wrench />}
          value={`${displayStats.standardisationScore}%`}
          label="Standardisation"
          color="#1a73e8"
          loading={loading}
        />
      </div>

      {/* Recent Products */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Products</h3>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader size={32} className="spinner" style={{ color: '#1a73e8' }} />
          </div>
        ) : recentProducts.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Material Cost</th>
                  <th>Total Cost</th>
                  <th>Selling Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map(product => (
                  <tr key={product.code}>
                    <td><strong>{product.code}</strong></td>
                    <td>{product.name}</td>
                    <td>${product.materialCost.toFixed(2)}</td>
                    <td>${product.totalCost.toFixed(2)}</td>
                    <td>${product.sellingPrice.toFixed(2)}</td>
                    <td><span className="badge badge-complete">{product.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
            {isConnected ? 'No products found' : 'Connect to Google Sheets to see your products'}
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, value, label, color, loading }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '8px', 
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          {icon}
        </div>
      </div>
      {loading ? (
        <Loader size={24} className="spinner" style={{ color: color }} />
      ) : (
        <div className="stat-value" style={{ color }}>{value}</div>
      )}
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ============================================
// ENHANCED BOM CREATOR - VERSION 1.2 FINAL
// ============================================
// Changes from v1.1:
// - Profile is now dropdown for ALL component types
// - Complexity is read-only (default Level 3)
// - M, M², M³ are ALWAYS visible for all components
// ============================================

// ============================================
// ENHANCED BOM CREATOR - VERSION 1.3
// ============================================
// Changes from v1.2:
// - M³ now shows 8 decimal places
// - Uses POST request to avoid URL length limits
// - Better error handling
// ============================================

// BOM Creator Component - FINAL VERSION 1.3
function BOMCreator({ apiUrl, isConnected }) {
  // Product Information State
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [mainMaterial, setMainMaterial] = useState('');
  const [packaging, setPackaging] = useState({ length: '', width: '', height: '' });
  const [components, setComponents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  
  // Data Libraries State (populated from API)
  const [profiles, setProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [mainComponentOptions, setMainComponentOptions] = useState([]);
  const [partNamesByType, setPartNamesByType] = useState({});
  const [hardwareLibrary, setHardwareLibrary] = useState([]);
  const [fabricReferences, setFabricReferences] = useState([]);
  
  // Taxonomy options (can be loaded from API or use defaults)
  const [productTypes, setProductTypes] = useState([
    'Dining Chair', 'Lounge Chair', 'Armchair', 'Sofa', 
    'Dining Table', 'Coffee Table', 'Side Table', 'Console Table',
    'Sun Lounger', 'Bar Stool', 'Bench', 'Ottoman', 'Daybed',
    'Modular Sofa', 'Corner Sofa'
  ]);
  
  const [mainMaterials, setMainMaterials] = useState([
    'Aluminum', 'Wood', 'Aluminum + Wood', 'Aluminum + Rope', 
    'Wood + Rope', 'Aluminum + Textilene'
  ]);
  
  // UI State
  const [activeTab, setActiveTab] = useState('manual');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [similarMatches, setSimilarMatches] = useState({});
  const [showSimilarModal, setShowSimilarModal] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const subComponentOptions = [
    { value: 'ALUMINUM', label: 'Aluminum', category: 'metal' },
    { value: 'TEAK', label: 'Teak', category: 'wood' },
    { value: 'ACACIA', label: 'Acacia', category: 'wood' },
    { value: 'EUCALYPTUS', label: 'Eucalyptus', category: 'wood' },
    { value: 'KAMERERE', label: 'Kamerere', category: 'wood' },
    { value: 'FABRIC', label: 'Fabric', category: 'soft' },
    { value: 'FOAM', label: 'Foam', category: 'soft' },
    { value: 'CUSHION INSERT', label: 'Cushion Insert', category: 'soft' },
    { value: 'HARDWARE', label: 'Hardware', category: 'hardware' },
    { value: 'ACCESSORIES', label: 'Accessories', category: 'hardware' },
    { value: 'ROPE', label: 'Rope', category: 'soft' },
    { value: 'TEXTILENE', label: 'Textilene / Batyline', category: 'soft' }
  ];

  // Pre-loaded profile options
  const defaultProfileOptions = [
    // Rectangular Profiles
    { value: '40x20', label: '40x20', type: 'RECTANGULAR' },
    { value: '50x20', label: '50x20', type: 'RECTANGULAR' },
    { value: '50x25', label: '50x25', type: 'RECTANGULAR' },
    { value: '60x20', label: '60x20', type: 'RECTANGULAR' },
    { value: '70x70', label: '70x70', type: 'RECTANGULAR' },
    { value: '70x30', label: '70x30', type: 'RECTANGULAR' },
    { value: '64x64', label: '64x64', type: 'RECTANGULAR' },
    { value: '50x50', label: '50x50', type: 'RECTANGULAR' },
    { value: '40x40', label: '40x40', type: 'RECTANGULAR' },
    { value: '37x25', label: '37x25', type: 'RECTANGULAR' },
    { value: '38x10', label: '38x10', type: 'RECTANGULAR' },
    { value: '38x18.5', label: '38x18.5', type: 'RECTANGULAR' },
    { value: '30x20', label: '30x20', type: 'RECTANGULAR' },
    { value: '26x13', label: '26x13', type: 'RECTANGULAR' },
    { value: '25x25', label: '25x25', type: 'RECTANGULAR' },
    { value: '20x20', label: '20x20', type: 'RECTANGULAR' },
    { value: '51x8', label: '51x8', type: 'SLAT' },
    // Round Tubes
    { value: 'Ø60', label: 'Ø60', type: 'ROUND' },
    { value: 'Ø30', label: 'Ø30', type: 'ROUND' },
    { value: 'Ø25', label: 'Ø25', type: 'ROUND' },
    { value: 'Ø20', label: 'Ø20', type: 'ROUND' },
    { value: 'Ø16', label: 'Ø16', type: 'ROUND' },
    { value: 'Ø12', label: 'Ø12', type: 'ROUND' },
    // Flat Bars
    { value: '25x3', label: '25x3', type: 'FLATBAR' },
    { value: '25x5', label: '25x5', type: 'FLATBAR' },
    // Plates
    { value: 'PLATE 3 MM', label: 'PLATE 3 MM', type: 'PLATE' },
    // Hardware Screw Sizes
    { value: '6X1/2"', label: '6X1/2"', type: 'SCREW' },
    { value: '6X3/4"', label: '6X3/4"', type: 'SCREW' },
    { value: '8X1/2"', label: '8X1/2"', type: 'SCREW' },
    { value: '8X3/4"', label: '8X3/4"', type: 'SCREW' },
    { value: '8X1"', label: '8X1"', type: 'SCREW' },
    { value: '8X1 1/2"', label: '8X1 1/2"', type: 'SCREW' },
    { value: '8X2"', label: '8X2"', type: 'SCREW' },
    // Hardware Bolts/Nuts
    { value: 'M6', label: 'M6', type: 'BOLT' },
    { value: 'M8', label: 'M8', type: 'BOLT' },
    { value: 'M6x15', label: 'M6x15', type: 'BOLT' },
    { value: 'M6x20', label: 'M6x20', type: 'BOLT' },
    { value: 'M6x40', label: 'M6x40', type: 'BOLT' },
    { value: 'M6x45', label: 'M6x45', type: 'BOLT' },
    { value: 'M6x60', label: 'M6x60', type: 'BOLT' },
    { value: 'M7x70', label: 'M7x70', type: 'BOLT' },
    { value: 'M8x15', label: 'M8x15', type: 'BOLT' },
    { value: 'M8x40', label: 'M8x40', type: 'BOLT' },
    { value: 'M8x50', label: 'M8x50', type: 'BOLT' },
  ];

  // Load all data libraries on mount
  useEffect(() => {
    if (isConnected) {
      loadAllLibraries();
    } else {
      setLoading(false);
      setAllProfiles(defaultProfileOptions);
    }
  }, [isConnected]);

  const loadAllLibraries = async () => {
    setLoading(true);
    try {
      const [profilesRes, mainCompRes, partNamesRes, hardwareRes, fabricRes, taxonomyRes] = await Promise.all([
        fetch(`${apiUrl}?action=getAllProfiles`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${apiUrl}?action=getMainComponents`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${apiUrl}?action=getPartNamesByType`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${apiUrl}?action=getHardwareLibrary`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${apiUrl}?action=getFabricReferences`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${apiUrl}?action=getTaxonomies`).then(r => r.json()).catch(() => ({ success: false }))
      ]);

   // Load profiles from single source of truth (Profile_Registry)
      const allProfilesRes = await fetch(`${apiUrl}?action=getAllProfiles`).then(r => r.json()).catch(() => ({ success: false }));

      // Load profiles from single source of truth (Profile_Registry)
      if (profilesRes.success && profilesRes.dropdownOptions) {
        // Only show PRODUCED and REVIEW profiles in dropdown (not NEW - they need tooling)
        const availableProfiles = profilesRes.dropdownOptions
          .filter(p => p.status === 'PRODUCED' || p.status === 'REVIEW')
          .map(p => ({
            value: p.value,
            label: `${p.type === 'ROUND' ? 'Ø' + p.width : p.width + 'x' + p.height}x${p.thickness}`,
            type: p.type,
            status: p.status
          }));
        
        setAllProfiles(availableProfiles);
        setProfiles(profilesRes.profiles || []);
      } else {
        setAllProfiles(defaultProfileOptions);
      }
      
      if (mainCompRes.success) setMainComponentOptions(mainCompRes.mainComponents);
      if (partNamesRes.success) setPartNamesByType(partNamesRes.partNames);
      if (hardwareRes.success) setHardwareLibrary(hardwareRes.hardware);
      if (fabricRes.success) setFabricReferences(fabricRes.fabrics);
      
      // Load taxonomies if available
      if (taxonomyRes.success) {
        if (taxonomyRes.productTypes) setProductTypes(taxonomyRes.productTypes);
        if (taxonomyRes.mainMaterials) setMainMaterials(taxonomyRes.mainMaterials);
      }
      
    } catch (error) {
      console.error('Error loading libraries:', error);
      setAllProfiles(defaultProfileOptions);
    }
    setLoading(false);
  };

  // Add new profile to the list
  const addNewProfile = (newProfileValue) => {
    if (!newProfileValue || allProfiles.find(p => p.value === newProfileValue)) return;
    
    setAllProfiles(prev => [...prev, {
      value: newProfileValue,
      label: newProfileValue + ' (NEW)',
      type: 'CUSTOM'
    }]);
  };

  // Search for existing products (for cloning)
  const searchProducts = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`${apiUrl}?action=searchProducts&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.products);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Clone an existing product
  const cloneProduct = async (productCode) => {
    try {
      const res = await fetch(`${apiUrl}?action=getProductBOM&code=${encodeURIComponent(productCode)}`);
      const data = await res.json();
      
      if (data.success) {
        setProductName(data.product.name + ' (Copy)');
        setProductType(data.product.type);
        setMainMaterial(data.product.mainMaterial);
        
        const clonedComponents = data.components.map((comp, idx) => ({
          id: Date.now() + idx,
          mainComponent: comp.mainComponent || '',
          subComponent: normalizeSubComponentValue(comp.subComponent),
          partName: comp.partName || '',
          profile: comp.profile || '',
          length: String(comp.length || ''),
          width: String(comp.width || ''),
          thickness: String(comp.thickness || ''),
          qty: String(comp.quantity || 1),
          m: String(comp.m || ''),
          m2: String(comp.m2 || ''),
          m3: String(comp.m3 || ''),
          weight: String(comp.weight || ''),
          totalWeight: String(comp.totalWeight || ''),
          density: String(comp.density || ''),
          note: String(comp.note || ''),
          componentId: comp.componentId || '',
          isCloned: true
        }));
        
        setComponents(clonedComponents);
        setActiveTab('manual');
        setSearchQuery('');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error cloning product:', error);
      alert('Error cloning product: ' + error.message);
    }
  };

  // Normalize sub-component values
  const normalizeSubComponentValue = (value) => {
    const upper = String(value).toUpperCase();
    if (upper.includes('TEAK')) return 'TEAK';
    if (upper.includes('ACACIA')) return 'ACACIA';
    if (upper.includes('EUCALYPTUS')) return 'EUCALYPTUS';
    if (upper.includes('KAMERERE')) return 'KAMERERE';
    if (upper.includes('ALUMINUM') || upper.includes('ALUMINIUM')) return 'ALUMINUM';
    if (upper.includes('FABRIC')) return 'FABRIC';
    if (upper.includes('FOAM')) return 'FOAM';
    if (upper.includes('CUSHION') || upper.includes('INSERT') || upper.includes('NETTING') || upper.includes('DACRON') || upper.includes('LINING')) return 'CUSHION INSERT';
    if (upper.includes('HARDWARE')) return 'HARDWARE';
    if (upper.includes('ACCESOIRE') || upper.includes('ACCESSOR')) return 'ACCESSORIES';
    if (upper.includes('ROPE')) return 'ROPE';
    if (upper.includes('TEXTILENE') || upper.includes('BATYLINE')) return 'TEXTILENE';
    return 'HARDWARE';
  };

  // Check for similar existing components
  const checkSimilarComponents = async (compId, subComponent, length, width, thickness) => {
    if (!length || !width) return;
    
    const isWoodOrMetal = ['TEAK', 'ACACIA', 'EUCALYPTUS', 'KAMERERE', 'ALUMINUM'].includes(subComponent);
    if (!isWoodOrMetal) return;
    
    try {
      const params = { subComponent, length, width, thickness: thickness || 0, tolerance: 10 };
      const encodedParams = encodeURIComponent(JSON.stringify(params));
      const res = await fetch(`${apiUrl}?action=searchSimilarComponents&data=${encodedParams}`);
      const data = await res.json();
      
      if (data.success && data.matches.length > 0) {
        setSimilarMatches(prev => ({ ...prev, [compId]: data.matches }));
      } else {
        setSimilarMatches(prev => {
          const newMatches = { ...prev };
          delete newMatches[compId];
          return newMatches;
        });
      }
    } catch (error) {
      console.error('Error checking similar components:', error);
    }
  };

  // Add new component
  const addComponent = () => {
    setComponents([...components, {
      id: Date.now(),
      mainComponent: '',
      subComponent: 'TEAK',
      partName: '',
      profile: '',
      length: '',
      width: '',
      thickness: '',
      qty: '1',
      m: '',
      m2: '',
      m3: '',
      weight: '',
      totalWeight: '',
      density: '',
      note: '',
      fabricRef: '',
      isConfirmedNew: false
    }]);
  };

  // Add hardware component
  const addHardwareComponent = () => {
    setComponents([...components, {
      id: Date.now(),
      mainComponent: '',
      subComponent: 'HARDWARE',
      partName: '',
      profile: '',
      length: '',
      width: '',
      thickness: '',
      qty: '1',
      m: '',
      m2: '',
      m3: '',
      weight: '',
      totalWeight: '',
      density: '',
      note: '',
      isHardware: true
    }]);
  };

  // Update component field
  const updateComponent = (id, field, value) => {
    setComponents(components.map(comp => {
      if (comp.id !== id) return comp;
      
      const updated = { ...comp, [field]: value };
      
      if (['length', 'width', 'thickness', 'subComponent'].includes(field)) {
        const l = field === 'length' ? value : comp.length;
        const w = field === 'width' ? value : comp.width;
        const t = field === 'thickness' ? value : comp.thickness;
        const sub = field === 'subComponent' ? value : comp.subComponent;
        
        clearTimeout(updated.checkTimeout);
        updated.checkTimeout = setTimeout(() => {
          checkSimilarComponents(id, sub, l, w, t);
        }, 500);
      }
      
      return updated;
    }));
  };

  // Use existing component
  const useExistingComponent = (compId, existingComp) => {
    setComponents(components.map(comp => {
      if (comp.id !== compId) return comp;
      return {
        ...comp,
        componentId: existingComp.componentId,
        length: existingComp.length,
        width: existingComp.width,
        thickness: existingComp.thickness,
        isExisting: true,
        existingCost: existingComp.cost
      };
    }));
    setSimilarMatches(prev => {
      const newMatches = { ...prev };
      delete newMatches[compId];
      return newMatches;
    });
    setShowSimilarModal(null);
  };

  // Confirm creating new component
  const confirmNewComponent = (compId) => {
    setComponents(components.map(comp => {
      if (comp.id !== compId) return comp;
      return { ...comp, isConfirmedNew: true };
    }));
    setSimilarMatches(prev => {
      const newMatches = { ...prev };
      delete newMatches[compId];
      return newMatches;
    });
    setShowSimilarModal(null);
  };

  // Remove component
  const removeComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
    setSimilarMatches(prev => {
      const newMatches = { ...prev };
      delete newMatches[id];
      return newMatches;
    });
  };

  // Handle Excel file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploadFile(file);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        let headerRowIdx = 0;
        for (let i = 0; i < Math.min(5, jsonData.length); i++) {
          const row = jsonData[i];
          if (row && row[0] && String(row[0]).toUpperCase().includes('MAIN COMPONENT')) {
            headerRowIdx = i;
            break;
          }
        }
        
        const parsedComponents = [];
        for (let i = headerRowIdx + 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row || !row[0]) continue;
          
          const profileValue = String(row[3] || '').trim();
          if (profileValue) {
            addNewProfile(profileValue);
          }
          
          parsedComponents.push({
            id: Date.now() + i,
            mainComponent: String(row[0] || '').toUpperCase().trim(),
            subComponent: normalizeSubComponentValue(row[1] || ''),
            partName: String(row[2] || '').toUpperCase().trim(),
            profile: profileValue,
            length: String(row[4] || ''),
            width: String(row[5] || ''),
            thickness: String(row[6] || ''),
            qty: String(row[7] || 1),
            m: String(row[8] || ''),
            m2: String(row[9] || ''),
            m3: String(row[10] || ''),
            weight: String(row[11] || ''),
            totalWeight: String(row[12] || ''),
            density: String(row[13] || ''),
            note: String(row[14] || '')
          });
        }
        
        const fileName = file.name.replace(/^BOM_/, '').replace(/\.xlsx?$/i, '').replace(/_/g, ' ');
        
        setUploadPreview({
          fileName: file.name,
          productName: fileName,
          componentCount: parsedComponents.length,
          components: parsedComponents
        });
        
      } catch (error) {
        console.error('Error parsing Excel:', error);
        alert('Error parsing Excel file: ' + error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Import uploaded BOM
  const importUploadedBOM = () => {
    if (!uploadPreview) return;
    
    setProductName(uploadPreview.productName);
    setComponents(uploadPreview.components);
    setActiveTab('manual');
    setUploadPreview(null);
    setUploadFile(null);
  };

  // ============================================
  // SUBMIT BOM - USING POST REQUEST
  // ============================================
  const handleSubmit = async () => {
    if (!productName) {
      alert('Please enter a product name');
      return;
    }
    if (components.length === 0) {
      alert('Please add at least one component');
      return;
    }
    if (!isConnected) {
      alert('Not connected to Google Sheets. Please check settings.');
      return;
    }
    
    const unresolvedMatches = Object.keys(similarMatches).filter(id => 
      !components.find(c => c.id === parseInt(id))?.isConfirmedNew
    );
    if (unresolvedMatches.length > 0) {
      alert('Please resolve similar component matches before submitting (shown in yellow)');
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const payload = {
        action: 'processBOM',
        productName,
        productType,
        mainMaterial,
        complexity: 3,
        packaging: {
          length: parseFloat(packaging.length) || 0,
          width: parseFloat(packaging.width) || 0,
          height: parseFloat(packaging.height) || 0
        },
        components: components.map(comp => ({
          mainComponent: comp.mainComponent.toUpperCase(),
          subComponent: comp.subComponent,
          partName: comp.partName.toUpperCase(),
          profile: comp.profile || '',
          length: parseFloat(comp.length) || 0,
          width: parseFloat(comp.width) || 0,
          thickness: parseFloat(comp.thickness) || 0,
          qty: parseFloat(comp.qty) || 1,
          m: parseFloat(comp.m) || 0,
          m2: parseFloat(comp.m2) || 0,
          m3: parseFloat(comp.m3) || 0,
          weight: parseFloat(comp.weight) || 0,
          totalWeight: parseFloat(comp.totalWeight) || 0,
          density: comp.density || '',
          note: comp.note || '',
          componentId: comp.componentId || '',
          fabricRef: comp.fabricRef || ''
        }))
      };

      // Use POST request to handle large payloads
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires this
        headers: {
          'Content-Type': 'text/plain', // Apps Script limitation
        },
        body: JSON.stringify(payload)
      });

      // Due to no-cors, we can't read the response directly
      // So we need to use a callback approach or check results separately
      // For now, we'll use a follow-up GET to check status
      
      // Alternative: Use GET with chunked data for smaller BOMs
      // or use a proxy/different architecture
      
      // Fallback to GET with compressed data for compatibility
      const compressedPayload = {
        action: 'processBOM',
        p: productName,
        t: productType,
        m: mainMaterial,
        c: 3,
        pkg: [packaging.length || 0, packaging.width || 0, packaging.height || 0],
        cmp: components.map(comp => [
          comp.mainComponent.toUpperCase(),
          comp.subComponent,
          comp.partName.toUpperCase(),
          comp.profile || '',
          parseFloat(comp.length) || 0,
          parseFloat(comp.width) || 0,
          parseFloat(comp.thickness) || 0,
          parseFloat(comp.qty) || 1,
          parseFloat(comp.m) || 0,
          parseFloat(comp.m2) || 0,
          parseFloat(comp.m3) || 0,
          parseFloat(comp.weight) || 0,
          parseFloat(comp.totalWeight) || 0,
          comp.density || '',
          comp.note || '',
          comp.componentId || ''
        ])
      };

      const encodedData = encodeURIComponent(JSON.stringify(compressedPayload));
      
      // Check if URL would be too long
      const fullUrl = `${apiUrl}?action=processBOMCompressed&data=${encodedData}`;
      
      if (fullUrl.length > 7000) {
        // URL too long - use chunked submission
        await submitInChunks(payload);
      } else {
        // URL is acceptable length - use GET
        const getResponse = await fetch(fullUrl, {
          method: 'GET',
          redirect: 'follow'
        });
        
        const data = await getResponse.json();
        
        if (data.success) {
          setResult(data);
          loadAllLibraries();
        } else {
          alert('Error: ' + (data.error || 'Failed to process BOM'));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting BOM: ' + error.message + '\n\nTry reducing the number of components or contact support.');
    }

    setSubmitting(false);
  };

  // Submit large BOMs in chunks
  const submitInChunks = async (payload) => {
    try {
      // First, create the product entry
      const productPayload = {
        action: 'createProduct',
        productName: payload.productName,
        productType: payload.productType,
        mainMaterial: payload.mainMaterial,
        complexity: payload.complexity,
        packaging: payload.packaging,
        componentCount: payload.components.length
      };
      
      const productEncoded = encodeURIComponent(JSON.stringify(productPayload));
      const productRes = await fetch(`${apiUrl}?action=createProduct&data=${productEncoded}`);
      const productData = await productRes.json();
      
      if (!productData.success) {
        throw new Error(productData.error || 'Failed to create product');
      }
      
      const productCode = productData.productCode;
      
      // Then add components in batches of 5
      const batchSize = 5;
      for (let i = 0; i < payload.components.length; i += batchSize) {
        const batch = payload.components.slice(i, i + batchSize);
        
        const batchPayload = {
          action: 'addComponents',
          productCode: productCode,
          components: batch,
          batchIndex: Math.floor(i / batchSize),
          isLastBatch: (i + batchSize) >= payload.components.length
        };
        
        const batchEncoded = encodeURIComponent(JSON.stringify(batchPayload));
        const batchRes = await fetch(`${apiUrl}?action=addComponents&data=${batchEncoded}`);
        const batchData = await batchRes.json();
        
        if (!batchData.success) {
          throw new Error(batchData.error || `Failed to add components batch ${Math.floor(i / batchSize)}`);
        }
      }
      
      // Finally, calculate the cost
      const calcRes = await fetch(`${apiUrl}?action=calculateProductCost&code=${encodeURIComponent(productCode)}`);
      const calcData = await calcRes.json();
      
      if (calcData.success) {
        setResult(calcData);
        loadAllLibraries();
      } else {
        throw new Error(calcData.error || 'Failed to calculate cost');
      }
      
    } catch (error) {
      throw error;
    }
  };

  // Reset form
  const resetForm = () => {
    setProductName('');
    setProductType('');
    setMainMaterial('');
    setPackaging({ length: '', width: '', height: '' });
    setComponents([]);
    setResult(null);
    setSimilarMatches({});
    setUploadPreview(null);
    setUploadFile(null);
  };

  // Get part name suggestions
  const getPartNameSuggestions = (subComponent) => {
    return partNamesByType[subComponent] || [];
  };

  // Render similar component warning
  const renderSimilarWarning = (compId) => {
    const matches = similarMatches[compId];
    if (!matches || matches.length === 0) return null;
    
    const comp = components.find(c => c.id === compId);
    if (comp?.isConfirmedNew || comp?.isExisting) return null;

    return (
      <div className="similar-warning">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={14} color="#856404" />
          <span style={{ color: '#856404', fontWeight: '500' }}>
            {matches[0].isExact ? 'Exact match exists!' : `${matches.length} similar component(s) found`}
          </span>
          <button
            onClick={() => setShowSimilarModal(compId)}
            style={{
              marginLeft: 'auto',
              padding: '2px 8px',
              fontSize: '11px',
              background: '#ffc107',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Review
          </button>
        </div>
      </div>
    );
  };

  // Render Similar Component Modal
  const renderSimilarModal = () => {
    if (!showSimilarModal) return null;
    
    const matches = similarMatches[showSimilarModal];
    const comp = components.find(c => c.id === showSimilarModal);
    if (!matches || !comp) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle color="#856404" />
            Similar Components Found
          </h3>
          
          <p style={{ color: '#666', fontSize: '14px' }}>
            Your component: <strong>{comp.subComponent} {comp.length}×{comp.width}×{comp.thickness}mm</strong>
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '500', marginBottom: '8px' }}>Existing matches:</p>
            {matches.map((match, idx) => (
              <div key={idx} style={{
                padding: '12px',
                border: match.isExact ? '2px solid #28a745' : '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '8px',
                background: match.isExact ? '#d4edda' : '#f8f9fa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>
                      {match.componentId}
                      {match.isExact && <span style={{ color: '#28a745', marginLeft: '8px' }}>✓ Exact Match</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                      Dimensions: {match.length}×{match.width}×{match.thickness}mm
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                      Cost: ${match.cost.toFixed(2)} • Used {match.timesUsed} times
                    </div>
                  </div>
                  <button
                    onClick={() => useExistingComponent(showSimilarModal, match)}
                    className="btn btn-primary"
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    Use This
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '16px' }}>
            <button onClick={() => setShowSimilarModal(null)} className="btn btn-secondary">
              Cancel
            </button>
            <button
              onClick={() => confirmNewComponent(showSimilarModal)}
              className="btn"
              style={{ background: '#dc3545', color: 'white' }}
            >
              Create New Anyway
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Loader size={48} className="spinner" style={{ color: '#1a73e8' }} />
        <p style={{ marginTop: '16px', color: '#666' }}>Loading component libraries...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>BOM Creator</h2>
        
        <div className="tab-buttons">
          <button
            className={`btn ${activeTab === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('manual')}
          >
            <FileText size={16} /> Manual Entry
          </button>
          <button
            className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={16} /> Upload Excel
          </button>
          <button
            className={`btn ${activeTab === 'clone' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('clone')}
          >
            <Copy size={16} /> Clone Product
          </button>
        </div>
      </div>

      {/* Success Result */}
      {result && (
        <div className="card" style={{ background: '#d4edda', border: '1px solid #c3e6cb', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <CheckCircle size={32} color="#155724" />
            <div>
              <h3 style={{ color: '#155724', margin: 0 }}>BOM Processed Successfully!</h3>
              <p style={{ color: '#155724', margin: '4px 0 0 0' }}>Code: {result.productCode}</p>
            </div>
          </div>
          <div className="grid-3" style={{ gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#155724' }}>Material Cost</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#155724' }}>${result.materialCost?.toFixed(2) || '0.00'}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#155724' }}>Total Cost (Level 3)</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#155724' }}>${result.totalCost?.toFixed(2) || '0.00'}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#155724' }}>Selling Price</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#155724' }}>${result.sellingPrice?.toFixed(2) || '0.00'}</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#155724', marginTop: '12px', fontStyle: 'italic' }}>
            ℹ️ Cost calculated at Complexity Level 3 (Default). Engineering can adjust via Cost Analysis.
          </p>
          {result.warnings && result.warnings.length > 0 && (
            <div style={{ marginTop: '16px', padding: '12px', background: '#fff3cd', borderRadius: '4px' }}>
              <strong style={{ color: '#856404' }}>Warnings:</strong>
              <ul style={{ margin: '8px 0 0 20px', color: '#856404' }}>
                {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}
          <button className="btn btn-primary" onClick={resetForm} style={{ marginTop: '16px' }}>
            Create Another BOM
          </button>
        </div>
      )}

      {/* Clone Tab */}
      {activeTab === 'clone' && !result && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Clone Existing Product</h3>
          </div>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            Search for an existing product to use as a template.
          </p>
          <div className="form-group">
            <label className="form-label">Search Products</label>
            <input
              type="text"
              className="form-input"
              placeholder="Type product name or code..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchProducts(e.target.value);
              }}
            />
          </div>
          
          {searchResults.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              {searchResults.map(product => (
                <div key={product.code} className="search-result">
                  <div>
                    <div style={{ fontWeight: '500' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {product.code} • {product.type} • {product.componentCount} components
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => cloneProduct(product.code)}>
                    Clone
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && !result && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upload Excel BOM</h3>
          </div>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            Upload a factory BOM Excel file. Columns: MAIN COMPONENT, SUB COMPONENT, PART NAME, PROFILE, L, W, THICKNESS, QTY, M, M², M³, WEIGHT, TOTAL WEIGHT, DENSITY, NOTE
          </p>
          
          <div className="upload-zone">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="bom-upload"
            />
            <label htmlFor="bom-upload" style={{ cursor: 'pointer' }}>
              <Upload size={48} style={{ color: '#999', marginBottom: '12px' }} />
              <p style={{ color: '#666' }}>
                {uploadFile ? uploadFile.name : 'Click to select Excel file'}
              </p>
            </label>
          </div>
          
          {uploadPreview && (
            <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
              <h4 style={{ marginTop: 0 }}>Preview: {uploadPreview.fileName}</h4>
              <p>Product Name: <strong>{uploadPreview.productName}</strong></p>
              <p>Components Found: <strong>{uploadPreview.componentCount}</strong></p>
              
              <div className="preview-table" style={{ marginTop: '12px' }}>
                <table className="data-table" style={{ fontSize: '11px' }}>
                  <thead>
                    <tr>
                      <th>Main</th>
                      <th>Sub</th>
                      <th>Part</th>
                      <th>Profile</th>
                      <th>L</th>
                      <th>W</th>
                      <th>T</th>
                      <th>Qty</th>
                      <th>M</th>
                      <th>M²</th>
                      <th>M³</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadPreview.components.slice(0, 10).map((comp, idx) => (
                      <tr key={idx}>
                        <td>{comp.mainComponent}</td>
                        <td>{comp.subComponent}</td>
                        <td>{comp.partName}</td>
                        <td>{comp.profile}</td>
                        <td>{comp.length}</td>
                        <td>{comp.width}</td>
                        <td>{comp.thickness}</td>
                        <td>{comp.qty}</td>
                        <td>{comp.m}</td>
                        <td>{comp.m2}</td>
                        <td>{comp.m3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" onClick={importUploadedBOM}>
                  Import & Edit
                </button>
                <button className="btn btn-secondary" onClick={() => {
                  setUploadPreview(null);
                  setUploadFile(null);
                }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual Entry Tab */}
      {activeTab === 'manual' && !result && (
        <>
          {/* Product Information */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Product Information</h3>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g., Sicily Dining Table 180x90"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Product Type</label>
                <select 
                  className="form-select"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="">Select type...</option>
                  {productTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Main Material</label>
                <select 
                  className="form-select"
                  value={mainMaterial}
                  onChange={(e) => setMainMaterial(e.target.value)}
                >
                  <option value="">Select material...</option>
                  {mainMaterials.map(mat => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Complexity Level</label>
                <div style={{ 
                  padding: '10px 12px', 
                  background: '#f1f3f4', 
                  borderRadius: '6px', 
                  color: '#5f6368',
                  fontSize: '14px'
                }}>
                  Level 3 - Moderate (50% labor) <span style={{ fontStyle: 'italic' }}>• Default</span>
                  <div style={{ fontSize: '11px', marginTop: '4px', color: '#888' }}>
                    Engineering can adjust complexity in Cost Analysis
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Component Entry */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">BOM Components ({components.length})</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={addHardwareComponent}>
                  <Plus size={16} /> Add Hardware
                </button>
                <button className="btn btn-primary" onClick={addComponent}>
                  <Plus size={16} /> Add Component
                </button>
              </div>
            </div>

            {components.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
                <Layers size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>No components added yet</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Click "Add Component" to start building your BOM
                </p>
              </div>
            ) : (
              <div>
                {/* Table Header */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '110px 90px 120px 70px 50px 50px 45px 40px 50px 50px 80px 50px 55px 60px 1fr 28px',
                  gap: '4px',
                  padding: '8px 12px',
                  background: '#f8f9fa',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '9px',
                  fontWeight: '600',
                  color: '#5f6368',
                  textTransform: 'uppercase'
                }}>
                  <div>Main Comp *</div>
                  <div>Sub Comp *</div>
                  <div>Part Name *</div>
                  <div>Profile</div>
                  <div>L</div>
                  <div>W</div>
                  <div>T</div>
                  <div>Qty</div>
                  <div>M</div>
                  <div>M²</div>
                  <div>M³</div>
                  <div>Wt</div>
                  <div>Tot.Wt</div>
                  <div>Density</div>
                  <div>Note</div>
                  <div></div>
                </div>
                
                {components.map((comp, index) => (
                  <div 
                    key={comp.id} 
                    className={`bom-row ${similarMatches[comp.id] && !comp.isConfirmedNew && !comp.isExisting ? 'bom-row-warning' : ''}`}
                    style={{ padding: '6px 12px' }}
                  >
                    {/* Component Row - Grid Layout */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '110px 90px 120px 70px 50px 50px 45px 40px 50px 50px 80px 50px 55px 60px 1fr 28px',
                      gap: '4px',
                      alignItems: 'center'
                    }}>
                      {/* Main Component */}
                      <input
                        type="text"
                        className="form-input"
                        list={`main-comp-${comp.id}`}
                        placeholder="LEGS"
                        value={comp.mainComponent}
                        onChange={(e) => updateComponent(comp.id, 'mainComponent', e.target.value.toUpperCase())}
                        style={{ fontSize: '11px', padding: '5px 6px' }}
                      />
                      <datalist id={`main-comp-${comp.id}`}>
                        {mainComponentOptions.map(mc => <option key={mc} value={mc} />)}
                      </datalist>
                      
                      {/* Sub Component */}
                      <select
                        className="form-select"
                        value={comp.subComponent}
                        onChange={(e) => updateComponent(comp.id, 'subComponent', e.target.value)}
                        style={{ fontSize: '11px', padding: '5px 2px' }}
                      >
                        {subComponentOptions.map(sc => (
                          <option key={sc.value} value={sc.value}>{sc.label}</option>
                        ))}
                      </select>
                      
                      {/* Part Name */}
                      <input
                        type="text"
                        className="form-input"
                        list={`part-name-${comp.id}`}
                        placeholder="SLAT 1"
                        value={comp.partName}
                        onChange={(e) => updateComponent(comp.id, 'partName', e.target.value.toUpperCase())}
                        style={{ fontSize: '11px', padding: '5px 6px' }}
                      />
                      <datalist id={`part-name-${comp.id}`}>
                        {getPartNameSuggestions(comp.subComponent).map(pn => <option key={pn} value={pn} />)}
                      </datalist>
                      
                      {/* Profile - DROPDOWN */}
                      <select
                        className="form-select"
                        value={comp.profile}
                        onChange={(e) => {
                          if (e.target.value === '__ADD_NEW__') {
                            const newProfile = prompt('Enter new profile dimension:');
                            if (newProfile) {
                              addNewProfile(newProfile);
                              updateComponent(comp.id, 'profile', newProfile);
                            }
                          } else {
                            updateComponent(comp.id, 'profile', e.target.value);
                          }
                        }}
                        style={{ fontSize: '10px', padding: '5px 1px' }}
                      >
                        <option value="">-</option>
                        {allProfiles.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                        <option value="__ADD_NEW__">+ New</option>
                      </select>
                      
                      {/* L (mm) */}
                      <input type="number" className="form-input" value={comp.length || ''} onChange={(e) => updateComponent(comp.id, 'length', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* W (mm) */}
                      <input type="number" className="form-input" value={comp.width || ''} onChange={(e) => updateComponent(comp.id, 'width', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* T (mm) */}
                      <input type="number" className="form-input" value={comp.thickness || ''} onChange={(e) => updateComponent(comp.id, 'thickness', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* Qty */}
                      <input type="number" className="form-input" value={comp.qty || '1'} min="1" onChange={(e) => updateComponent(comp.id, 'qty', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* M (metre length) */}
                      <input type="number" className="form-input" value={comp.m || ''} step="0.01" onChange={(e) => updateComponent(comp.id, 'm', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* M² (metre square) */}
                      <input type="number" className="form-input" value={comp.m2 || ''} step="0.0001" onChange={(e) => updateComponent(comp.id, 'm2', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* M³ (metre cubic) - 8 DECIMAL PLACES */}
                      <input 
                        type="number" 
                        className="form-input" 
                        value={comp.m3 || ''} 
                        step="0.00000001" 
                        onChange={(e) => updateComponent(comp.id, 'm3', e.target.value)} 
                        style={{ fontSize: '11px', padding: '5px 3px' }} 
                      />
                      
                      {/* Weight */}
                      <input type="number" className="form-input" value={comp.weight || ''} step="0.01" onChange={(e) => updateComponent(comp.id, 'weight', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* Total Weight */}
                      <input type="number" className="form-input" value={comp.totalWeight || ''} step="0.01" onChange={(e) => updateComponent(comp.id, 'totalWeight', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* Density */}
                      <input type="text" className="form-input" value={comp.density || ''} onChange={(e) => updateComponent(comp.id, 'density', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* Note */}
                      <input type="text" className="form-input" value={comp.note || ''} placeholder="" onChange={(e) => updateComponent(comp.id, 'note', e.target.value)} style={{ fontSize: '11px', padding: '5px 3px' }} />
                      
                      {/* Delete */}
                      <button
                        onClick={() => removeComponent(comp.id)}
                        style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', padding: '2px' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    {renderSimilarWarning(comp.id)}
                    
                    {comp.isExisting && (
                      <div className="badge-existing" style={{ marginTop: '4px', fontSize: '10px' }}>
                        ✓ Using: {comp.componentId}
                      </div>
                    )}
                    
                    {comp.isConfirmedNew && (
                      <div className="badge-new" style={{ marginTop: '4px', fontSize: '10px' }}>
                        ✓ New component
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Packaging */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Packaging Dimensions (cm)</h3>
            </div>
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Length (cm)</label>
                <input type="number" className="form-input" placeholder="0" value={packaging.length} onChange={(e) => setPackaging({...packaging, length: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Width (cm)</label>
                <input type="number" className="form-input" placeholder="0" value={packaging.width} onChange={(e) => setPackaging({...packaging, width: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input type="number" className="form-input" placeholder="0" value={packaging.height} onChange={(e) => setPackaging({...packaging, height: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              className="btn btn-primary" 
              onClick={handleSubmit}
              disabled={submitting || !isConnected}
            >
              {submitting ? (
                <><Loader size={18} className="spinner" /> Processing...</>
              ) : (
                <><Calculator size={18} /> Calculate Cost</>
              )}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>
              Clear Form
            </button>
          </div>
        </>
      )}
      
      {renderSimilarModal()}
    </div>
  );
}


// ============================================
// ENHANCED COST ANALYSIS - WITH COMPLEXITY CONTROL
// ============================================
// This replaces the existing CostAnalysis component in App.js
// Engineering can adjust complexity levels and create cost versions
// ============================================

function CostAnalysis({ apiUrl, isConnected }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [costVersions, setCostVersions] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState(3);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Complexity level definitions
  const complexityLevels = [
    { value: 1, label: 'Level 1 - Simple', laborPercent: 20, description: 'Flat surfaces, minimal assembly' },
    { value: 2, label: 'Level 2 - Basic', laborPercent: 35, description: 'Basic joinery, simple frames' },
    { value: 3, label: 'Level 3 - Moderate', laborPercent: 50, description: 'Standard furniture, multiple components' },
    { value: 4, label: 'Level 4 - Complex', laborPercent: 70, description: 'Curved elements, intricate joinery' },
    { value: 5, label: 'Level 5 - Very Complex', laborPercent: 100, description: 'Artistic, highly detailed work' }
  ];

  useEffect(() => {
    if (isConnected) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}?action=getProducts`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const fetchProductDetails = async (productCode) => {
    try {
      const res = await fetch(`${apiUrl}?action=getProductDetails&code=${encodeURIComponent(productCode)}`);
      const data = await res.json();
      if (data.success) {
        setProductDetails(data);
        setSelectedComplexity(data.complexity || 3);
        // Fetch cost versions
        fetchCostVersions(productCode);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchCostVersions = async (productCode) => {
    try {
      const res = await fetch(`${apiUrl}?action=getCostVersions&code=${encodeURIComponent(productCode)}`);
      const data = await res.json();
      if (data.success) {
        setCostVersions(data.versions || []);
      }
    } catch (error) {
      console.error('Error fetching cost versions:', error);
      setCostVersions([]);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    fetchProductDetails(product.code);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setProductDetails(null);
    setCostVersions([]);
    setShowVersionHistory(false);
  };

  // Recalculate costs with new complexity level
  const recalculateWithComplexity = async (newComplexity) => {
    if (!selectedProduct) return;
    
    setRecalculating(true);
    
    try {
      const payload = {
        productCode: selectedProduct.code,
        newComplexity: newComplexity,
        createVersion: true // Always create a new version
      };
      
      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const res = await fetch(`${apiUrl}?action=recalculateCost&data=${encodedData}`);
      const data = await res.json();
      
      if (data.success) {
        // Update local state with new calculations
        setProductDetails(prev => ({
          ...prev,
          complexity: newComplexity,
          laborCost: data.laborCost,
          totalCost: data.totalCost,
          sellingPrice: data.sellingPrice,
          factoryProfit: data.factoryProfit,
          yourProfit: data.yourProfit
        }));
        
        setSelectedComplexity(newComplexity);
        
        // Refresh cost versions
        fetchCostVersions(selectedProduct.code);
        
        // Update product in list
        setProducts(prev => prev.map(p => 
          p.code === selectedProduct.code 
            ? { ...p, complexity: newComplexity, totalCost: data.totalCost, sellingPrice: data.sellingPrice }
            : p
        ));
        
        alert(`Cost recalculated at Complexity Level ${newComplexity}. New version saved.`);
      } else {
        alert('Error recalculating: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error recalculating:', error);
      alert('Error recalculating cost: ' + error.message);
    }
    
    setRecalculating(false);
  };

  // Calculate preview of costs at different complexity levels
  const calculatePreview = (complexityLevel) => {
    if (!productDetails) return null;
    
    const materialCost = productDetails.materialCost || 0;
    const laborPercent = complexityLevels.find(c => c.value === complexityLevel)?.laborPercent || 50;
    
    const laborCost = materialCost * (laborPercent / 100);
    const overhead = (materialCost + laborCost) * 0.20;
    const packagingCost = productDetails.packagingCost || 0;
    const subtotal = materialCost + laborCost + overhead + packagingCost;
    const factoryProfit = subtotal * 0.07;
    const totalCost = subtotal + factoryProfit;
    const sellingPrice = totalCost * 1.24;
    const yourProfit = sellingPrice - totalCost;
    
    return {
      laborCost,
      overhead,
      totalCost,
      sellingPrice,
      yourProfit
    };
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Loader size={48} className="spinner" style={{ color: '#1a73e8' }} />
        <p style={{ marginTop: '16px', color: '#666' }}>Loading products...</p>
      </div>
    );
  }

  // Product Detail View
  if (selectedProduct && productDetails) {
    const currentLevel = complexityLevels.find(c => c.value === selectedComplexity);
    
    return (
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Cost Analysis</h2>
        
        <button 
          className="btn btn-secondary" 
          onClick={handleBackToProducts}
          style={{ marginBottom: '24px' }}
        >
          ← Back to Products
        </button>

        {/* Cost Summary Cards */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #1a73e8, #4285f4)' }}>
            <div className="cost-summary-title">TOTAL COST</div>
            <div className="cost-summary-value">${productDetails.totalCost?.toFixed(2) || '0.00'}</div>
            <div className="cost-summary-subtitle">Factory price</div>
          </div>
          <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #34a853, #4caf50)' }}>
            <div className="cost-summary-title">SELLING PRICE</div>
            <div className="cost-summary-value">${productDetails.sellingPrice?.toFixed(2) || '0.00'}</div>
            <div className="cost-summary-subtitle">+24% margin</div>
          </div>
          <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #5f6368, #757575)' }}>
            <div className="cost-summary-title">YOUR PROFIT</div>
            <div className="cost-summary-value">${((productDetails.sellingPrice || 0) - (productDetails.totalCost || 0)).toFixed(2)}</div>
            <div className="cost-summary-subtitle">Per unit</div>
          </div>
        </div>

        {/* Product Info & Complexity Control */}
        <div className="grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
          {/* Cost Breakdown */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{productDetails.name || selectedProduct.name}</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Material Cost</td>
                  <td>${productDetails.materialCost?.toFixed(2) || '0.00'}</td>
                  <td>Sum of {productDetails.componentCount || 0} components</td>
                </tr>
                <tr>
                  <td>2. Labor Cost</td>
                  <td>${productDetails.laborCost?.toFixed(2) || '0.00'}</td>
                  <td>Complexity Level {selectedComplexity} ({currentLevel?.laborPercent}%)</td>
                </tr>
                <tr>
                  <td>3. Overhead</td>
                  <td>${productDetails.overhead?.toFixed(2) || '0.00'}</td>
                  <td>20% of (Materials + Labor)</td>
                </tr>
                <tr>
                  <td>4. Packaging</td>
                  <td>${productDetails.packagingCost?.toFixed(2) || '0.00'}</td>
                  <td>Box surface area</td>
                </tr>
                <tr>
                  <td>5. Factory Profit</td>
                  <td>${productDetails.factoryProfit?.toFixed(2) || '0.00'}</td>
                  <td>7% margin</td>
                </tr>
                <tr style={{ background: '#e8f5e9', fontWeight: '600' }}>
                  <td>TOTAL COST</td>
                  <td>${productDetails.totalCost?.toFixed(2) || '0.00'}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Complexity Control - ENGINEERING */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚙️ Engineering: Complexity Control</h3>
            </div>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
              Adjust complexity level to recalculate labor costs. Each change creates a new cost version.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Current Complexity Level</label>
              <div style={{ 
                padding: '12px 16px', 
                background: '#e8f0fe', 
                borderRadius: '8px',
                border: '2px solid #1a73e8',
                marginBottom: '12px'
              }}>
                <div style={{ fontWeight: '600', color: '#1a73e8' }}>
                  {currentLevel?.label}
                </div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                  {currentLevel?.description}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                  Labor = {currentLevel?.laborPercent}% of material cost
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Recalculate at Different Level</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {complexityLevels.map(level => {
                  const preview = calculatePreview(level.value);
                  const isCurrentLevel = level.value === selectedComplexity;
                  
                  return (
                    <div 
                      key={level.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: isCurrentLevel ? '#e8f0fe' : '#f8f9fa',
                        borderRadius: '6px',
                        border: isCurrentLevel ? '2px solid #1a73e8' : '1px solid #e0e0e0',
                        opacity: isCurrentLevel ? 0.7 : 1
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '13px' }}>
                          {level.label}
                          {isCurrentLevel && <span style={{ color: '#1a73e8', marginLeft: '8px' }}>(Current)</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#888' }}>
                          Labor: {level.laborPercent}% → ${preview?.laborCost.toFixed(2)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>
                          ${preview?.totalCost.toFixed(2)}
                        </div>
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: '11px', padding: '4px 10px', marginTop: '4px' }}
                          disabled={isCurrentLevel || recalculating}
                          onClick={() => recalculateWithComplexity(level.value)}
                        >
                          {recalculating ? 'Processing...' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Version History Toggle */}
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              style={{ width: '100%' }}
            >
              {showVersionHistory ? 'Hide' : 'Show'} Cost Version History ({costVersions.length})
            </button>
          </div>
        </div>

        {/* Cost Version History */}
        {showVersionHistory && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📋 Cost Version History</h3>
            </div>
            {costVersions.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                No version history available yet.
              </p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Date</th>
                    <th>Complexity</th>
                    <th>Material Cost</th>
                    <th>Labor Cost</th>
                    <th>Total Cost</th>
                    <th>Selling Price</th>
                    <th>Changed By</th>
                  </tr>
                </thead>
                <tbody>
                  {costVersions.map((version, idx) => (
                    <tr key={idx} style={{ background: idx === 0 ? '#e8f5e9' : 'transparent' }}>
                      <td>
                        <strong>v{version.version || costVersions.length - idx}</strong>
                        {idx === 0 && <span className="badge badge-complete" style={{ marginLeft: '8px' }}>Current</span>}
                      </td>
                      <td>{version.date || 'N/A'}</td>
                      <td>Level {version.complexity}</td>
                      <td>${version.materialCost?.toFixed(2) || '0.00'}</td>
                      <td>${version.laborCost?.toFixed(2) || '0.00'}</td>
                      <td><strong>${version.totalCost?.toFixed(2) || '0.00'}</strong></td>
                      <td>${version.sellingPrice?.toFixed(2) || '0.00'}</td>
                      <td>{version.changedBy || 'System'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* BOM Components */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">BOM Components</h3>
          </div>
          {productDetails.components && productDetails.components.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Main Component</th>
                  <th>Sub Component</th>
                  <th>Part Name</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.components.map((comp, idx) => (
                  <tr key={idx}>
                    <td>{comp.mainComponent}</td>
                    <td>{comp.subComponent}</td>
                    <td>{comp.partName}</td>
                    <td>{comp.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              No component details available.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Products List View
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Cost Analysis</h2>
      
      {!isConnected ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <AlertTriangle size={48} color="#ffc107" style={{ marginBottom: '16px' }} />
          <p>Connect to Google Sheets to view cost analysis</p>
        </div>
      ) : products.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <Package size={48} color="#999" style={{ marginBottom: '16px' }} />
          <p>No products found. Create a BOM first.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Select Product for Analysis</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Product Name</th>
                <th>Type</th>
                <th>Complexity</th>
                <th>Material Cost</th>
                <th>Total Cost</th>
                <th>Selling Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.code}>
                  <td><strong>{product.code}</strong></td>
                  <td>{product.name}</td>
                  <td>{product.type}</td>
                  <td>
                    <span className={`badge ${product.complexity ? 'badge-complete' : 'badge-new'}`}>
                      {product.complexity ? `Level ${product.complexity}` : 'Not Set'}
                    </span>
                  </td>
                  <td>${product.materialCost?.toFixed(2) || '0.00'}</td>
                  <td><strong>${product.totalCost?.toFixed(2) || '0.00'}</strong></td>
                  <td>${product.sellingPrice?.toFixed(2) || '0.00'}</td>
                  <td>
                    <span className={`badge ${product.status === 'Costed' ? 'badge-complete' : 'badge-incomplete'}`}>
                      {product.status || 'Unknown'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary" 
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                      onClick={() => handleSelectProduct(product)}
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


// Profile Registry Component
function ProfileRegistry({ apiUrl, isConnected }) {
  const [profiles, setProfiles] = useState([]);
  const [stats, setStats] = useState({ produced: 0, new: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      fetchProfiles();
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  const fetchProfiles = async () => {
    try {
      const res = await fetch(`${apiUrl}?action=getProfiles`);
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles);
        setStats({
          produced: data.produced,
          new: data.new,
          total: data.count
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const markProduced = async (profileId) => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markProfileProduced', profileId })
      });
      const data = await res.json();
      if (data.success) {
        fetchProfiles();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const score = stats.total > 0 ? Math.round(stats.produced / stats.total * 100) : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Profile Registry</h2>
        {isConnected && (
          <button className="btn btn-secondary" onClick={fetchProfiles}>
            <RefreshCw size={16} />
            Refresh
          </button>
        )}
      </div>
      
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard icon={<Wrench />} value={stats.total} label="Total Profiles" color="#1a73e8" loading={loading} />
        <StatCard icon={<CheckCircle />} value={stats.produced} label="PRODUCED" color="#34a853" loading={loading} />
        <StatCard icon={<AlertTriangle />} value={stats.new} label="NEW / Review" color="#fbbc04" loading={loading} />
        <StatCard icon={<BarChart3 />} value={`${score}%`} label="Standardisation" color={score >= 90 ? '#34a853' : '#fbbc04'} loading={loading} />
      </div>

      {/* Profile Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Aluminum Profiles</h3>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader size={32} className="spinner" style={{ color: '#1a73e8' }} />
          </div>
        ) : profiles.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Profile ID</th>
                  <th>Type</th>
                  <th>Dimensions</th>
                  <th>Status</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map(profile => (
                  <tr key={profile.id}>
                    <td><strong>{profile.id}</strong></td>
                    <td>{profile.type}</td>
                    <td>{profile.type === 'ROUND' ? `Ø${profile.width}×${profile.thickness}` : `${profile.width}×${profile.height}×${profile.thickness}`}</td>
                    <td>
                      <span className={`badge badge-${profile.status.toLowerCase()}`}>
                        {profile.status}
                      </span>
                    </td>
                    <td>{profile.productsUsing}</td>
                    <td>
                      {profile.status !== 'PRODUCED' && (
                        <button 
                          className="btn btn-success" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          onClick={() => markProduced(profile.id)}
                        >
                          Mark PRODUCED
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
            {isConnected ? 'No profiles found' : 'Connect to Google Sheets to see profiles'}
          </p>
        )}
      </div>
    </div>
  );
}

// Materials Library Component
function MaterialsLibrary({ apiUrl, isConnected }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (isConnected) {
      fetchMaterials();
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  const fetchMaterials = async () => {
    try {
      const res = await fetch(`${apiUrl}?action=getMaterials`);
      const data = await res.json();
      if (data.success) {
        setMaterials(data.materials);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(filter.toLowerCase()) ||
    m.id.toLowerCase().includes(filter.toLowerCase()) ||
    m.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Materials Library</h2>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Raw Materials ({materials.length})</h3>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search materials..." 
            style={{ width: '250px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader size={32} className="spinner" style={{ color: '#1a73e8' }} />
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Material ID</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Unit</th>
                  <th>Cost (USD)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map(mat => (
                  <tr key={mat.id}>
                    <td><strong>{mat.id}</strong></td>
                    <td>{mat.category}</td>
                    <td>{mat.name}</td>
                    <td>{mat.unit}</td>
                    <td>${mat.unitCost > 0 ? mat.unitCost.toFixed(2) : mat.pricePerKg.toFixed(2)}/{ mat.unitCost > 0 ? mat.unit : 'kg'}</td>
                    <td><span className="badge badge-produced">{mat.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
            {isConnected ? (filter ? 'No materials match your search' : 'No materials found') : 'Connect to Google Sheets to see materials'}
          </p>
        )}
      </div>
    </div>
  );
}

// Products List Component
function ProductsList({ apiUrl, isConnected }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (isConnected) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}?action=getProducts`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.code.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Products ({products.length})</h2>
        {isConnected && (
          <button className="btn btn-secondary" onClick={fetchProducts}>
            <RefreshCw size={16} />
            Refresh
          </button>
        )}
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Product Index</h3>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search products..." 
            style={{ width: '250px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader size={32} className="spinner" style={{ color: '#1a73e8' }} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Type</th>
                  <th>Material Cost</th>
                  <th>Total Cost</th>
                  <th>Selling Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.code}>
                    <td><strong>{p.code}</strong></td>
                    <td>{p.name}</td>
                    <td>{p.type}</td>
                    <td>${p.materialCost.toFixed(2)}</td>
                    <td>${p.totalCost.toFixed(2)}</td>
                    <td>${p.sellingPrice.toFixed(2)}</td>
                    <td><span className="badge badge-complete">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
            {isConnected ? (filter ? 'No products match your search' : 'No products found') : 'Connect to Google Sheets to see products'}
          </p>
        )}
      </div>
    </div>
  );
}

// Settings Page Component
function SettingsPage({ apiUrl }) {
  const isConfigured = apiUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Settings</h2>
      
      {/* Connection Setup */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Google Sheets Connection</h3>
          <span className={`badge ${isConfigured ? 'badge-produced' : 'badge-new'}`}>
            {isConfigured ? 'Configured' : 'Not Configured'}
          </span>
        </div>
        
        <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <p style={{ fontWeight: '600', marginBottom: '8px' }}>Current API URL:</p>
          <code style={{ 
            background: '#e9ecef', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            display: 'block',
            wordBreak: 'break-all',
            fontSize: '13px'
          }}>
            {apiUrl}
          </code>
        </div>

        <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Setup Instructions:</h4>
        <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Open your Google Sheets Script Editor</li>
          <li>Add the <strong>WEB_APP_API_V510.gs</strong> code to your script</li>
          <li>Click <strong>Deploy → New deployment</strong></li>
          <li>Select type: <strong>Web app</strong></li>
          <li>Set "Execute as": <strong>Me</strong></li>
          <li>Set "Who has access": <strong>Anyone</strong></li>
          <li>Click <strong>Deploy</strong> and copy the Web App URL</li>
          <li>Update <code>API_URL</code> in <code>src/App.js</code> line 15</li>
          <li>Commit and push to GitHub</li>
        </ol>

        <div style={{ marginTop: '24px', padding: '16px', background: '#e8f5e9', borderRadius: '8px' }}>
          <strong style={{ color: '#2e7d32' }}>💡 Tip:</strong>
          <p style={{ color: '#2e7d32', marginTop: '4px' }}>
            After deploying, test by visiting: <code>[YOUR_URL]?action=getStats</code>
            <br />
            You should see JSON data with your stats.
          </p>
        </div>
      </div>

      {/* Costing Rules */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Costing Rules</h3>
        </div>
        <p style={{ color: '#5f6368', marginBottom: '16px' }}>
          Costing rules are managed in your Google Sheets <strong>Costing_Rules</strong> tab.
        </p>
        <div className="grid-2" style={{ gap: '16px' }}>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#5f6368' }}>Factory Overhead</div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>20%</div>
          </div>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#5f6368' }}>Factory Profit</div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>7%</div>
          </div>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#5f6368' }}>Your Margin</div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>24%</div>
          </div>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#5f6368' }}>Target Variance</div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>±10%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// TAXONOMY LIBRARY - V5.2.0
// With Structured Profile Editor
// ============================================
function TaxonomyLibrary({ apiUrl, isConnected }) {
  const [activeCategory, setActiveCategory] = useState('productTypes');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [taxonomies, setTaxonomies] = useState({
    productTypes: [],
    mainMaterials: [],
    mainComponents: [],
    subComponents: []
  });
  const [profiles, setProfiles] = useState([]);
  const [profileShapes, setProfileShapes] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  // Profile Editor State
  const [newProfile, setNewProfile] = useState({
    material: 'ALUMINUM',
    type: 'RECTANGULAR',
    width: '',
    height: '',
    thickness: '',
    status: 'NEW',
    notes: ''
  });
  const [profileError, setProfileError] = useState('');
  const [addingProfile, setAddingProfile] = useState(false);

  const categories = [
    { id: 'productTypes', label: 'Product Types', description: 'Types of furniture (Dining Chair, Coffee Table, etc.)' },
    { id: 'mainMaterials', label: 'Main Materials', description: 'Primary materials (Aluminum, Wood, etc.)' },
    { id: 'mainComponents', label: 'Main Components', description: 'Major sections (LEGS, TOP TABLE, BACKREST, etc.)' },
    { id: 'subComponents', label: 'Sub Components', description: 'Material types (TEAK, ALUMINUM, HARDWARE, etc.)' },
    { id: 'profiles', label: 'Profiles', description: 'Aluminum/Steel profiles with dimensions and thickness', isSpecial: true }
  ];

  useEffect(() => {
    if (isConnected) {
      loadAllData();
    } else {
      loadDefaults();
    }
  }, [isConnected]);

  const loadDefaults = () => {
    setTaxonomies({
      productTypes: ['Dining Chair', 'Lounge Chair', 'Dining Table', 'Coffee Table', 'Sun Lounger'],
      mainMaterials: ['Aluminum', 'Wood', 'Aluminum + Wood'],
      mainComponents: ['LEGS', 'TOP TABLE', 'BACKREST', 'SEATREST', 'ARMREST'],
      subComponents: [
        {value:'ALUMINUM',label:'Aluminum'},
        {value:'TEAK',label:'Teak'},
        {value:'HARDWARE',label:'Hardware'}
      ]
    });
    setProfileShapes([
      { value: 'RECTANGULAR', label: 'Rectangular', requiresHeight: true },
      { value: 'SQUARE', label: 'Square', requiresHeight: false },
      { value: 'ROUND', label: 'Round Tube', requiresHeight: false },
      { value: 'FLATBAR', label: 'Flat Bar', requiresHeight: true },
      { value: 'PLATE', label: 'Plate/Sheet', requiresHeight: false }
    ]);
    setLoading(false);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load taxonomies (excluding profiles)
      const taxRes = await fetch(`${apiUrl}?action=getAllTaxonomies`);
      const taxData = await taxRes.json();
      if (taxData.success) {
        setTaxonomies({
          productTypes: taxData.taxonomies.productTypes || [],
          mainMaterials: taxData.taxonomies.mainMaterials || [],
          mainComponents: taxData.taxonomies.mainComponents || [],
          subComponents: taxData.taxonomies.subComponents || []
        });
      }
      
      // Load profiles from Profile_Registry (single source of truth)
      const profRes = await fetch(`${apiUrl}?action=getAllProfiles`);
      const profData = await profRes.json();
      if (profData.success) {
        setProfiles(profData.profiles || []);
      }
      
      // Load profile shapes
      const shapesRes = await fetch(`${apiUrl}?action=getProfileShapes`);
      const shapesData = await shapesRes.json();
      if (shapesData.success) {
        setProfileShapes(shapesData.shapes || []);
      }
      
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  // Save taxonomies (not profiles - those save individually)
  const saveTaxonomies = async () => {
    if (!isConnected) { alert('Not connected to Google Sheets'); return; }
    setSaving(true);
    try {
      const payload = { taxonomies: taxonomies };
      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const res = await fetch(`${apiUrl}?action=saveTaxonomies&data=${encodedData}`);
      const data = await res.json();
      if (data.success) {
        alert('Taxonomies saved successfully!');
      } else {
        alert('Error saving: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error saving taxonomies: ' + error.message);
    }
    setSaving(false);
  };

  // Add new profile with validation
  const addProfile = async () => {
    if (!isConnected) { alert('Not connected to Google Sheets'); return; }
    
    setProfileError('');
    setAddingProfile(true);
    
    try {
      const payload = {
        material: newProfile.material,
        type: newProfile.type,
        width: parseFloat(newProfile.width) || 0,
        height: parseFloat(newProfile.height) || 0,
        thickness: parseFloat(newProfile.thickness) || 0,
        status: newProfile.status,
        notes: newProfile.notes
      };
      
      // Client-side validation
      if (newProfile.type === 'ROUND') {
        if (!newProfile.width) {
          setProfileError('Diameter is required for round profiles');
          setAddingProfile(false);
          return;
        }
      } else if (newProfile.type === 'PLATE') {
        // Only thickness needed
      } else {
        if (!newProfile.width) {
          setProfileError('Width is required');
          setAddingProfile(false);
          return;
        }
        if (newProfile.type === 'RECTANGULAR' && !newProfile.height) {
          setProfileError('Height is required for rectangular profiles');
          setAddingProfile(false);
          return;
        }
      }
      
      if ((newProfile.material === 'ALUMINUM' || newProfile.material === 'STEEL') && !newProfile.thickness) {
        setProfileError('Thickness is REQUIRED for aluminum and steel profiles');
        setAddingProfile(false);
        return;
      }
      
      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const res = await fetch(`${apiUrl}?action=addProfile&data=${encodedData}`);
      const data = await res.json();
      
      if (data.success) {
        // Add to local state
        setProfiles(prev => [...prev, data.profile]);
        // Reset form
        setNewProfile({
          material: 'ALUMINUM',
          type: 'RECTANGULAR',
          width: '',
          height: '',
          thickness: '',
          status: 'NEW',
          notes: ''
        });
        alert(`Profile ${data.profileId} added successfully!`);
      } else {
        setProfileError(data.error || 'Failed to add profile');
      }
    } catch (error) {
      setProfileError('Error adding profile: ' + error.message);
    }
    setAddingProfile(false);
  };

  // Delete profile
  const deleteProfile = async (profileId) => {
    if (!window.confirm(`Delete profile ${profileId}?`)) return;
    
    try {
      const payload = { profileId: profileId };
      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const res = await fetch(`${apiUrl}?action=deleteProfile&data=${encodedData}`);
      const data = await res.json();
      
      if (data.success) {
        setProfiles(prev => prev.filter(p => p.profileId !== profileId));
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error deleting profile: ' + error.message);
    }
  };

  // Update profile status
  const updateProfileStatus = async (profileId, newStatus) => {
    try {
      const payload = { profileId: profileId, status: newStatus };
      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const res = await fetch(`${apiUrl}?action=updateProfile&data=${encodedData}`);
      const data = await res.json();
      
      if (data.success) {
        setProfiles(prev => prev.map(p => 
          p.profileId === profileId ? { ...p, status: newStatus } : p
        ));
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  // Add item to non-profile categories
  const addItem = () => {
    if (!newItem.trim() || activeCategory === 'profiles') return;
    const category = activeCategory;
    let updatedList;
    
    if (category === 'subComponents') {
      const value = newItem.toUpperCase().trim();
      if (taxonomies.subComponents.find(s => s.value === value)) { alert('Already exists'); return; }
      updatedList = [...taxonomies.subComponents, { value, label: newItem.trim() }];
    } else {
      const value = category === 'mainComponents' ? newItem.toUpperCase().trim() : newItem.trim();
      if (taxonomies[category].includes(value)) { alert('Already exists'); return; }
      updatedList = [...taxonomies[category], value];
    }
    
    setTaxonomies(prev => ({ ...prev, [category]: updatedList }));
    setNewItem('');
  };

  const removeItem = (index) => {
    if (activeCategory === 'profiles') return;
    if (!window.confirm('Remove this item?')) return;
    const updatedList = [...taxonomies[activeCategory]];
    updatedList.splice(index, 1);
    setTaxonomies(prev => ({ ...prev, [activeCategory]: updatedList }));
  };

  const startEdit = (index, currentValue) => {
    setEditingItem(index);
    setEditValue(typeof currentValue === 'object' ? currentValue.value || currentValue.label : currentValue);
  };

  const saveEdit = (index) => {
    if (!editValue.trim() || activeCategory === 'profiles') return;
    const category = activeCategory;
    const updatedList = [...taxonomies[category]];
    
    if (category === 'subComponents') {
      updatedList[index] = { value: editValue.toUpperCase().trim(), label: editValue.trim() };
    } else if (category === 'mainComponents') {
      updatedList[index] = editValue.toUpperCase().trim();
    } else {
      updatedList[index] = editValue.trim();
    }
    
    setTaxonomies(prev => ({ ...prev, [category]: updatedList }));
    setEditingItem(null);
    setEditValue('');
  };

  const getDisplayValue = (item) => typeof item === 'object' ? item.label || item.value : item;
  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentItems = activeCategory === 'profiles' ? profiles : (taxonomies[activeCategory] || []);
  const selectedShape = profileShapes.find(s => s.value === newProfile.type);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Loader size={48} className="spinner" style={{ color: '#1a73e8' }} />
        <p style={{ marginTop: '16px', color: '#666' }}>Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Taxonomy Library</h2>
        {activeCategory !== 'profiles' && (
          <button className="btn btn-primary" onClick={saveTaxonomies} disabled={saving || !isConnected}>
            {saving ? <><Loader size={16} className="spinner" /> Saving...</> : <><Save size={16} /> Save Changes</>}
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
        {/* Categories Sidebar */}
        <div className="card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#5f6368' }}>CATEGORIES</h3>
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer',
                background: activeCategory === cat.id ? '#e8f0fe' : 'transparent',
                color: activeCategory === cat.id ? '#1a73e8' : '#202124', marginBottom: '4px',
                border: cat.isSpecial ? '2px solid #fbbc04' : 'none'
              }}
            >
              {cat.isSpecial ? <Wrench size={18} /> : <Database size={18} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>{cat.label}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>
                  {cat.id === 'profiles' ? profiles.length : (Array.isArray(taxonomies[cat.id]) ? taxonomies[cat.id].length : 0)} items
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">{currentCategory?.label}</h3>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{currentCategory?.description}</p>
            </div>
          </div>

          {/* PROFILES - Special Structured Editor */}
          {activeCategory === 'profiles' ? (
            <div>
              {/* Add New Profile Form */}
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={18} /> Add New Profile
                </h4>
                
                {profileError && (
                  <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px 12px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
                    ⚠️ {profileError}
                  </div>
                )}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Material */}
                  <div className="form-group">
                    <label className="form-label">Material *</label>
                    <select 
                      className="form-select"
                      value={newProfile.material}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, material: e.target.value }))}
                    >
                      <option value="ALUMINUM">Aluminum</option>
                      <option value="STEEL">Steel</option>
                    </select>
                  </div>
                  
                  {/* Shape Type */}
                  <div className="form-group">
                    <label className="form-label">Shape *</label>
                    <select 
                      className="form-select"
                      value={newProfile.type}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, type: e.target.value, height: '' }))}
                    >
                      {profileShapes.map(shape => (
                        <option key={shape.value} value={shape.value}>{shape.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Width / Diameter */}
                  <div className="form-group">
                    <label className="form-label">
                      {newProfile.type === 'ROUND' ? 'Diameter (mm) *' : 
                       newProfile.type === 'SQUARE' ? 'Size (mm) *' : 
                       newProfile.type === 'PLATE' ? 'N/A' : 'Width (mm) *'}
                    </label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={newProfile.width}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, width: e.target.value }))}
                      disabled={newProfile.type === 'PLATE'}
                      placeholder={newProfile.type === 'ROUND' ? 'e.g., 30' : 'e.g., 40'}
                    />
                  </div>
                  
                  {/* Height (only for rectangular/flatbar) */}
                  <div className="form-group">
                    <label className="form-label">
                      {newProfile.type === 'RECTANGULAR' || newProfile.type === 'FLATBAR' ? 'Height (mm) *' : 'Height (mm)'}
                    </label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={newProfile.height}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, height: e.target.value }))}
                      disabled={newProfile.type === 'ROUND' || newProfile.type === 'SQUARE' || newProfile.type === 'PLATE'}
                      placeholder={selectedShape?.requiresHeight ? 'e.g., 20' : 'N/A'}
                    />
                  </div>
                  
                  {/* Thickness - ALWAYS REQUIRED */}
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#d32f2f', fontWeight: '600' }}>
                      Wall Thickness (mm) * <span style={{ fontWeight: 'normal', fontSize: '11px' }}>(Required for tooling)</span>
                    </label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={newProfile.thickness}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, thickness: e.target.value }))}
                      placeholder="e.g., 1.5"
                      step="0.1"
                      style={{ borderColor: '#d32f2f' }}
                    />
                  </div>
                  
                  {/* Status */}
                  <div className="form-group">
                    <label className="form-label">Initial Status</label>
                    <select 
                      className="form-select"
                      value={newProfile.status}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="NEW">NEW (Needs tooling quote)</option>
                      <option value="REVIEW">REVIEW (Check if needed)</option>
                      <option value="PRODUCED">PRODUCED (Tooling exists)</option>
                    </select>
                  </div>
                </div>
                
                {/* Preview */}
                <div style={{ background: '#e3f2fd', padding: '12px', borderRadius: '6px', marginTop: '16px', marginBottom: '16px' }}>
                  <strong>Preview ID: </strong>
                  <code style={{ background: '#fff', padding: '4px 8px', borderRadius: '4px' }}>
                    {newProfile.material === 'STEEL' ? 'STL' : 'ALU'}-
                    {newProfile.type === 'ROUND' ? `TUBE-Ø${newProfile.width || '?'}x${newProfile.thickness || '?'}` :
                     newProfile.type === 'PLATE' ? `PLATE-${newProfile.thickness || '?'}MM` :
                     newProfile.type === 'FLATBAR' ? `FLATBAR-${newProfile.width || '?'}x${newProfile.height || '?'}` :
                     newProfile.type === 'SQUARE' ? `PROFILE-${newProfile.width || '?'}x${newProfile.width || '?'}x${newProfile.thickness || '?'}` :
                     `PROFILE-${newProfile.width || '?'}x${newProfile.height || '?'}x${newProfile.thickness || '?'}`}
                  </code>
                </div>
                
                <button 
                  className="btn btn-primary" 
                  onClick={addProfile}
                  disabled={addingProfile || !isConnected}
                >
                  {addingProfile ? <><Loader size={16} className="spinner" /> Adding...</> : <><Plus size={16} /> Add Profile</>}
                </button>
              </div>

              {/* Existing Profiles List */}
              <h4 style={{ marginBottom: '16px' }}>Existing Profiles ({profiles.length})</h4>
              
              {profiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  <Wrench size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No profiles in registry</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Profile ID</th>
                        <th>Type</th>
                        <th>Dimensions</th>
                        <th>Thickness</th>
                        <th>Status</th>
                        <th>Used In</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles.map((profile, idx) => (
                        <tr key={idx}>
                          <td><strong>{profile.profileId}</strong></td>
                          <td>{profile.type}</td>
                          <td>
                            {profile.type === 'ROUND' ? `Ø${profile.width}` :
                             profile.type === 'PLATE' ? '-' :
                             `${profile.width}×${profile.height}`}
                          </td>
                          <td>{profile.thickness}mm</td>
                          <td>
                            <select
                              value={profile.status}
                              onChange={(e) => updateProfileStatus(profile.profileId, e.target.value)}
                              className="form-select"
                              style={{ 
                                fontSize: '11px', 
                                padding: '4px 8px',
                                background: profile.status === 'PRODUCED' ? '#d4edda' : 
                                           profile.status === 'NEW' ? '#fff3cd' : '#ffeeba'
                              }}
                            >
                              <option value="NEW">NEW</option>
                              <option value="REVIEW">REVIEW</option>
                              <option value="PRODUCED">PRODUCED</option>
                            </select>
                          </td>
                          <td>{profile.productsUsing || 0}</td>
                          <td>
                            <button
                              onClick={() => deleteProfile(profile.profileId)}
                              disabled={profile.productsUsing > 0}
                              style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: profile.productsUsing > 0 ? '#ccc' : '#ea4335', 
                                cursor: profile.productsUsing > 0 ? 'not-allowed' : 'pointer',
                                padding: '4px'
                              }}
                              title={profile.productsUsing > 0 ? 'Cannot delete - used in products' : 'Delete profile'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* NON-PROFILE CATEGORIES - Original Simple Editor */
            <div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input
                  type="text" 
                  className="form-input" 
                  placeholder={`Add new ${currentCategory?.label?.toLowerCase()}...`}
                  value={newItem} 
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()} 
                  style={{ flex: 1 }}
                />
                <button className="btn btn-primary" onClick={addItem}><Plus size={16} /> Add</button>
              </div>

              {currentItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  <Database size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No items in this category</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
                  {currentItems.map((item, index) => (
                    <div key={index} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 12px', background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e0e0e0'
                    }}>
                      {editingItem === index ? (
                        <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                          <input type="text" className="form-input" value={editValue} onChange={(e) => setEditValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit(index)} style={{ flex: 1, padding: '4px 8px', fontSize: '13px' }} autoFocus />
                          <button onClick={() => saveEdit(index)} style={{ background: 'none', border: 'none', color: '#34a853', cursor: 'pointer' }}><Check size={16} /></button>
                          <button onClick={() => { setEditingItem(null); setEditValue(''); }} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                      ) : (
                        <>
                          <span style={{ fontSize: '13px', fontWeight: '500' }}>{getDisplayValue(item)}</span>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => startEdit(index, item)} style={{ background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', padding: '4px' }}><Edit2 size={14} /></button>
                            <button onClick={() => removeItem(index)} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', padding: '4px' }}><Trash2 size={14} /></button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;