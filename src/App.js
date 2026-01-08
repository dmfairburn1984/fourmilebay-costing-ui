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
  Upload,    // ADD THIS
  Copy,      // ADD THIS
  Search
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

function BOMCreator({ apiUrl, isConnected }) {
  // Product Information State
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [complexity, setComplexity] = useState('3');
  const [mainMaterial, setMainMaterial] = useState('');
  const [packaging, setPackaging] = useState({ length: '', width: '', height: '' });
  const [components, setComponents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  
  // Data Libraries State (populated from API)
  const [profiles, setProfiles] = useState([]);
  const [mainComponentOptions, setMainComponentOptions] = useState([]);
  const [partNamesByType, setPartNamesByType] = useState({});
  const [hardwareLibrary, setHardwareLibrary] = useState([]);
  const [fabricReferences, setFabricReferences] = useState([]);
  const [existingProducts, setExistingProducts] = useState([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState('manual'); // 'manual', 'upload', 'clone'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [similarMatches, setSimilarMatches] = useState({});
  const [showSimilarModal, setShowSimilarModal] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Static Options
  const productTypes = [
    'Dining Chair', 'Lounge Chair', 'Armchair', 'Sofa', 
    'Dining Table', 'Coffee Table', 'Side Table', 'Console Table',
    'Sun Lounger', 'Bar Stool', 'Bench', 'Ottoman', 'Daybed',
    'Modular Sofa', 'Corner Sofa'
  ];

  const mainMaterials = ['Aluminum', 'Wood', 'Aluminum + Wood', 'Aluminum + Rope', 'Wood + Rope', 'Aluminum + Textilene'];
  
  // Enhanced Sub-Component options with normalized keys
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

  // Load all data libraries on mount
  useEffect(() => {
    if (isConnected) {
      loadAllLibraries();
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  const loadAllLibraries = async () => {
    setLoading(true);
    try {
      // Load all libraries in parallel
      const [profilesRes, mainCompRes, partNamesRes, hardwareRes, fabricRes] = await Promise.all([
        fetch(`${apiUrl}?action=getProfiles`).then(r => r.json()),
        fetch(`${apiUrl}?action=getMainComponents`).then(r => r.json()),
        fetch(`${apiUrl}?action=getPartNamesByType`).then(r => r.json()),
        fetch(`${apiUrl}?action=getHardwareLibrary`).then(r => r.json()),
        fetch(`${apiUrl}?action=getFabricReferences`).then(r => r.json())
      ]);

      if (profilesRes.success) setProfiles(profilesRes.profiles.filter(p => p.status === 'PRODUCED'));
      if (mainCompRes.success) setMainComponentOptions(mainCompRes.mainComponents);
      if (partNamesRes.success) setPartNamesByType(partNamesRes.partNames);
      if (hardwareRes.success) setHardwareLibrary(hardwareRes.hardware);
      if (fabricRes.success) setFabricReferences(fabricRes.fabrics);
      
    } catch (error) {
      console.error('Error loading libraries:', error);
    }
    setLoading(false);
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
        // Populate form with cloned data
        setProductName(data.product.name + ' (Copy)');
        setProductType(data.product.type);
        setMainMaterial(data.product.mainMaterial);
        setComplexity(String(data.product.complexity || 3));
        
        // Convert components
        const clonedComponents = data.components.map((comp, idx) => ({
          id: Date.now() + idx,
          mainComponent: comp.mainComponent,
          subComponent: normalizeSubComponentValue(comp.subComponent),
          partName: comp.partName,
          profile: '',
          length: '',
          width: '',
          thickness: '',
          qty: String(comp.quantity || 1),
          volumeM3: '',
          componentId: comp.componentId,
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

  // Normalize sub-component values from BOM data
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
    return 'HARDWARE'; // Default fallback
  };

  // Check for similar existing components
  const checkSimilarComponents = async (compId, subComponent, length, width, thickness) => {
    if (!length || !width) return;
    
    const isWoodOrMetal = ['TEAK', 'ACACIA', 'EUCALYPTUS', 'KAMERERE', 'ALUMINUM'].includes(subComponent);
    if (!isWoodOrMetal) return; // Only check for wood/metal components
    
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

  // Add new component row
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
      volumeM3: '',
      m: '',
      m2: '',
      fabricRef: '',
      note: '',
      isConfirmedNew: false
    }]);
  };

  // Add hardware component (simplified)
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
      volumeM3: '',
      isHardware: true
    }]);
  };

  // Update component field
  const updateComponent = (id, field, value) => {
    setComponents(components.map(comp => {
      if (comp.id !== id) return comp;
      
      const updated = { ...comp, [field]: value };
      
      // Auto-check for similar components when dimensions change
      if (['length', 'width', 'thickness', 'subComponent'].includes(field)) {
        const l = field === 'length' ? value : comp.length;
        const w = field === 'width' ? value : comp.width;
        const t = field === 'thickness' ? value : comp.thickness;
        const sub = field === 'subComponent' ? value : comp.subComponent;
        
        // Debounce the check
        clearTimeout(updated.checkTimeout);
        updated.checkTimeout = setTimeout(() => {
          checkSimilarComponents(id, sub, l, w, t);
        }, 500);
      }
      
      return updated;
    }));
  };

  // Use existing component (from similar match)
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

  // Confirm creating new component (ignoring similar matches)
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
    
    // Parse Excel file using SheetJS (included via CDN in index.html)
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Find header row
        let headerRowIdx = 0;
        for (let i = 0; i < Math.min(5, jsonData.length); i++) {
          const row = jsonData[i];
          if (row && row[0] && String(row[0]).toUpperCase().includes('MAIN COMPONENT')) {
            headerRowIdx = i;
            break;
          }
        }
        
        // Parse components
        const parsedComponents = [];
        for (let i = headerRowIdx + 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row || !row[0]) continue;
          
          parsedComponents.push({
            id: Date.now() + i,
            mainComponent: String(row[0] || '').toUpperCase(),
            subComponent: normalizeSubComponentValue(row[1] || ''),
            partName: String(row[2] || '').toUpperCase(),
            profile: String(row[3] || ''),
            length: String(row[4] || ''),
            width: String(row[5] || ''),
            thickness: String(row[6] || ''),
            qty: String(row[7] || 1),
            m: String(row[8] || ''),
            m2: String(row[9] || ''),
            volumeM3: String(row[10] || ''),
            note: String(row[14] || '')
          });
        }
        
        // Extract product name from filename
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

  // Submit BOM
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
    
    // Check for unresolved similar matches
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
        complexity: parseInt(complexity),
        packaging: {
          length: parseFloat(packaging.length) || 0,
          width: parseFloat(packaging.width) || 0,
          height: parseFloat(packaging.height) || 0
        },
        components: components.map(comp => ({
          mainComponent: comp.mainComponent.toUpperCase(),
          subComponent: comp.subComponent,
          partName: comp.partName.toUpperCase(),
          profile: comp.profile,
          length: parseFloat(comp.length) || 0,
          width: parseFloat(comp.width) || 0,
          thickness: parseFloat(comp.thickness) || 0,
          qty: parseFloat(comp.qty) || 1,
          volumeM3: parseFloat(comp.volumeM3) || 0,
          m: parseFloat(comp.m) || 0,
          m2: parseFloat(comp.m2) || 0,
          componentId: comp.componentId || '',
          fabricRef: comp.fabricRef || '',
          note: comp.note || ''
        }))
      };

      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const response = await fetch(`${apiUrl}?action=processBOM&data=${encodedData}`, {
        method: 'GET',
        redirect: 'follow'
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
        // Reload libraries to include new components
        loadAllLibraries();
      } else {
        alert('Error: ' + (data.error || 'Failed to process BOM'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting BOM: ' + error.message);
    }

    setSubmitting(false);
  };

  // Reset form
  const resetForm = () => {
    setProductName('');
    setProductType('');
    setMainMaterial('');
    setComplexity('3');
    setPackaging({ length: '', width: '', height: '' });
    setComponents([]);
    setResult(null);
    setSimilarMatches({});
    setUploadPreview(null);
    setUploadFile(null);
  };

  // Get part name suggestions for current sub-component
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
      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        padding: '8px 12px',
        marginTop: '4px',
        fontSize: '12px'
      }}>
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
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
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
            <button
              onClick={() => setShowSimilarModal(null)}
              className="btn btn-secondary"
            >
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
        
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
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
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#155724' }}>${result.materialCost.toFixed(2)}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#155724' }}>Total Cost</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#155724' }}>${result.totalCost.toFixed(2)}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#155724' }}>Selling Price</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#155724' }}>${result.sellingPrice.toFixed(2)}</div>
            </div>
          </div>
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
            Search for an existing product to use as a template. All components will be copied.
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
              <p style={{ fontWeight: '500', marginBottom: '8px' }}>
                Found {searchResults.length} products:
              </p>
              {searchResults.map(product => (
                <div
                  key={product.code}
                  style={{
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '500' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {product.code} • {product.type} • {product.componentCount} components • ${product.totalCost.toFixed(2)}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => cloneProduct(product.code)}
                  >
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
            Upload a factory BOM Excel file. The file should have columns: MAIN COMPONENT, SUB COMPONENT, PART NAME, PROFILE, L, W, THICKNESS, QTY, M, M2, M3, etc.
          </p>
          
          <div style={{
            border: '2px dashed #ddd',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
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
                {uploadFile ? uploadFile.name : 'Click to select or drag Excel file here'}
              </p>
            </label>
          </div>
          
          {uploadPreview && (
            <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ marginTop: 0 }}>Preview: {uploadPreview.fileName}</h4>
              <p>Product Name: <strong>{uploadPreview.productName}</strong></p>
              <p>Components Found: <strong>{uploadPreview.componentCount}</strong></p>
              
              <div style={{ maxHeight: '200px', overflow: 'auto', marginTop: '12px' }}>
                <table className="data-table" style={{ fontSize: '12px' }}>
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
                      </tr>
                    ))}
                    {uploadPreview.components.length > 10 && (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', color: '#666' }}>
                          ... and {uploadPreview.components.length - 10} more
                        </td>
                      </tr>
                    )}
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
                <label className="form-label">Complexity Level (1-5)</label>
                <select 
                  className="form-select"
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                >
                  <option value="1">1 - Simple (20% labor)</option>
                  <option value="2">2 - Basic (35% labor)</option>
                  <option value="3">3 - Moderate (50% labor) - DEFAULT</option>
                  <option value="4">4 - Complex (70% labor)</option>
                  <option value="5">5 - Very Complex (100% labor)</option>
                </select>
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
                {components.map((comp, index) => (
                  <div 
                    key={comp.id} 
                    style={{
                      padding: '16px',
                      borderBottom: index < components.length - 1 ? '1px solid #eee' : 'none',
                      background: similarMatches[comp.id] && !comp.isConfirmedNew && !comp.isExisting ? '#fffef0' : 'transparent'
                    }}
                  >
                    {/* Row 1: Main fields */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                      {/* Main Component - Autocomplete */}
                      <div className="form-group" style={{ minWidth: '140px', flex: '1' }}>
                        <label className="form-label" style={{ fontSize: '11px' }}>Main Component</label>
                        <input
                          type="text"
                          className="form-input"
                          list={`main-comp-${comp.id}`}
                          placeholder="e.g., LEGS"
                          value={comp.mainComponent}
                          onChange={(e) => updateComponent(comp.id, 'mainComponent', e.target.value.toUpperCase())}
                        />
                        <datalist id={`main-comp-${comp.id}`}>
                          {mainComponentOptions.map(mc => (
                            <option key={mc} value={mc} />
                          ))}
                        </datalist>
                      </div>
                      
                      {/* Sub Component - Dropdown */}
                      <div className="form-group" style={{ minWidth: '130px' }}>
                        <label className="form-label" style={{ fontSize: '11px' }}>Sub Component</label>
                        <select
                          className="form-select"
                          value={comp.subComponent}
                          onChange={(e) => updateComponent(comp.id, 'subComponent', e.target.value)}
                        >
                          {subComponentOptions.map(sc => (
                            <option key={sc.value} value={sc.value}>{sc.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Part Name - Autocomplete */}
                      <div className="form-group" style={{ minWidth: '150px', flex: '1' }}>
                        <label className="form-label" style={{ fontSize: '11px' }}>Part Name</label>
                        <input
                          type="text"
                          className="form-input"
                          list={`part-name-${comp.id}`}
                          placeholder={comp.isHardware ? "e.g., SCREW FAB" : "e.g., SLAT 1"}
                          value={comp.partName}
                          onChange={(e) => updateComponent(comp.id, 'partName', e.target.value.toUpperCase())}
                        />
                        <datalist id={`part-name-${comp.id}`}>
                          {getPartNameSuggestions(comp.subComponent).map(pn => (
                            <option key={pn} value={pn} />
                          ))}
                        </datalist>
                      </div>
                      
                      {/* Profile - for Aluminum or Hardware */}
                      {(comp.subComponent === 'ALUMINUM' || comp.subComponent === 'HARDWARE') && (
                        <div className="form-group" style={{ minWidth: '100px' }}>
                          <label className="form-label" style={{ fontSize: '11px' }}>Profile</label>
                          {comp.subComponent === 'ALUMINUM' ? (
                            <select
                              className="form-select"
                              value={comp.profile}
                              onChange={(e) => updateComponent(comp.id, 'profile', e.target.value)}
                            >
                              <option value="">Select...</option>
                              {profiles.map(p => (
                                <option key={p.id} value={`${p.width}x${p.height}`}>
                                  {p.type === 'ROUND' ? `Ø${p.width}` : `${p.width}x${p.height}`}
                                </option>
                              ))}
                              <option value="PLATE 3 MM">PLATE 3MM</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g., M6x20"
                              value={comp.profile}
                              onChange={(e) => updateComponent(comp.id, 'profile', e.target.value)}
                            />
                          )}
                        </div>
                      )}
                      
                      {/* Dimensions - hide for hardware */}
                      {comp.subComponent !== 'HARDWARE' && comp.subComponent !== 'ACCESSORIES' && (
                        <>
                          <div className="form-group" style={{ width: '70px' }}>
                            <label className="form-label" style={{ fontSize: '11px' }}>L (mm)</label>
                            <input
                              type="number"
                              className="form-input"
                              value={comp.length}
                              onChange={(e) => updateComponent(comp.id, 'length', e.target.value)}
                            />
                          </div>
                          <div className="form-group" style={{ width: '70px' }}>
                            <label className="form-label" style={{ fontSize: '11px' }}>W (mm)</label>
                            <input
                              type="number"
                              className="form-input"
                              value={comp.width}
                              onChange={(e) => updateComponent(comp.id, 'width', e.target.value)}
                            />
                          </div>
                          <div className="form-group" style={{ width: '60px' }}>
                            <label className="form-label" style={{ fontSize: '11px' }}>T (mm)</label>
                            <input
                              type="number"
                              className="form-input"
                              value={comp.thickness}
                              onChange={(e) => updateComponent(comp.id, 'thickness', e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      
                      {/* Quantity */}
                      <div className="form-group" style={{ width: '60px' }}>
                        <label className="form-label" style={{ fontSize: '11px' }}>Qty</label>
                        <input
                          type="number"
                          className="form-input"
                          value={comp.qty}
                          min="1"
                          onChange={(e) => updateComponent(comp.id, 'qty', e.target.value)}
                        />
                      </div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => removeComponent(comp.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ea4335',
                          cursor: 'pointer',
                          padding: '8px',
                          marginBottom: '12px'
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    {/* Similar Component Warning */}
                    {renderSimilarWarning(comp.id)}
                    
                    {/* Existing Component Badge */}
                    {comp.isExisting && (
                      <div style={{
                        background: '#d4edda',
                        color: '#155724',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'inline-block'
                      }}>
                        ✓ Using existing: {comp.componentId} (${comp.existingCost?.toFixed(2)})
                      </div>
                    )}
                    
                    {/* Confirmed New Badge */}
                    {comp.isConfirmedNew && (
                      <div style={{
                        background: '#cce5ff',
                        color: '#004085',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'inline-block'
                      }}>
                        ✓ Creating new component
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
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="0"
                  value={packaging.length}
                  onChange={(e) => setPackaging({...packaging, length: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Width (cm)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="0"
                  value={packaging.width}
                  onChange={(e) => setPackaging({...packaging, width: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="0"
                  value={packaging.height}
                  onChange={(e) => setPackaging({...packaging, height: e.target.value})}
                />
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
                <>
                  <Loader size={18} className="spinner" />
                  Processing...
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  Calculate Cost
                </>
              )}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>
              Clear Form
            </button>
          </div>
        </>
      )}
      
      {/* Similar Component Modal */}
      {renderSimilarModal()}
    </div>
  );
}

// Cost Analysis Component
function CostAnalysis({ apiUrl, isConnected }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const selectProduct = async (code) => {
    try {
      const res = await fetch(`${apiUrl}?action=getProduct&code=${code}`);
      const data = await res.json();
      if (data.success) {
        setSelectedProduct(data.product);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Cost Analysis</h2>
      
      {!selectedProduct ? (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Select a Product to Analyze</h3>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Loader size={32} className="spinner" style={{ color: '#1a73e8' }} />
            </div>
          ) : products.length > 0 ? (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Total Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.code}>
                      <td>{p.code}</td>
                      <td>{p.name}</td>
                      <td>${p.totalCost.toFixed(2)}</td>
                      <td>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                          onClick={() => selectProduct(p.code)}
                        >
                          Analyze
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
              {isConnected ? 'No products found' : 'Connect to Google Sheets to see products'}
            </p>
          )}
        </div>
      ) : (
        <>
          <button 
            className="btn btn-secondary" 
            onClick={() => setSelectedProduct(null)}
            style={{ marginBottom: '16px' }}
          >
            ← Back to Products
          </button>

          {/* Cost Summary */}
          <div className="grid-3" style={{ marginBottom: '24px' }}>
            <div className="cost-summary">
              <div className="cost-summary-title">TOTAL COST</div>
              <div className="cost-summary-value">${selectedProduct.totalCost.toFixed(2)}</div>
              <div className="cost-summary-subtitle">Factory price</div>
            </div>
            <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #34a853, #4caf50)' }}>
              <div className="cost-summary-title">SELLING PRICE</div>
              <div className="cost-summary-value">${selectedProduct.sellingPrice.toFixed(2)}</div>
              <div className="cost-summary-subtitle">+24% margin</div>
            </div>
            <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #5f6368, #757575)' }}>
              <div className="cost-summary-title">YOUR PROFIT</div>
              <div className="cost-summary-value">${selectedProduct.yourProfit.toFixed(2)}</div>
              <div className="cost-summary-subtitle">Per unit</div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{selectedProduct.name}</h3>
            </div>
            <div className="table-container">
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
                    <td>${selectedProduct.materialCost.toFixed(2)}</td>
                    <td>Sum of {selectedProduct.componentCount} components</td>
                  </tr>
                  <tr>
                    <td>2. Labor Cost</td>
                    <td>${selectedProduct.laborCost.toFixed(2)}</td>
                    <td>Complexity Level {selectedProduct.complexity}</td>
                  </tr>
                  <tr>
                    <td>3. Overhead</td>
                    <td>${selectedProduct.overhead.toFixed(2)}</td>
                    <td>20% of (Materials + Labor)</td>
                  </tr>
                  <tr>
                    <td>4. Packaging</td>
                    <td>${selectedProduct.packaging.toFixed(2)}</td>
                    <td>Box surface area</td>
                  </tr>
                  <tr>
                    <td>5. Factory Profit</td>
                    <td>${selectedProduct.factoryProfit.toFixed(2)}</td>
                    <td>7% margin</td>
                  </tr>
                  <tr style={{ background: '#e8f0fe', fontWeight: '600' }}>
                    <td>TOTAL COST</td>
                    <td>${selectedProduct.totalCost.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BOM Components */}
          {selectedProduct.components && selectedProduct.components.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">BOM Components</h3>
              </div>
              <div className="table-container">
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
                    {selectedProduct.components.map((comp, i) => (
                      <tr key={i}>
                        <td>{comp.mainComponent}</td>
                        <td>{comp.subComponent}</td>
                        <td>{comp.partName}</td>
                        <td>{comp.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
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

export default App;