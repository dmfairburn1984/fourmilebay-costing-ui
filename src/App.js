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
  Loader
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

// BOM Creator Component - NOW SUBMITS TO GOOGLE SHEETS
function BOMCreator({ apiUrl, isConnected }) {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [complexity, setComplexity] = useState('3');
  const [mainMaterial, setMainMaterial] = useState('');
  const [packaging, setPackaging] = useState({ length: '', width: '', height: '' });
  const [components, setComponents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const productTypes = [
    'Dining Chair', 'Lounge Chair', 'Armchair', 'Sofa', 
    'Dining Table', 'Coffee Table', 'Side Table', 'Console Table',
    'Sun Lounger', 'Bar Stool', 'Bench', 'Ottoman'
  ];

  const mainMaterials = ['Aluminum', 'Wood', 'Aluminum + Wood', 'Aluminum + Rope', 'Wood + Rope'];
  
  const subComponentOptions = [
    'ALUMINUM', 'WOOD-ACACIA-STD', 'WOOD-TEAK-STD', 'WOOD-EUCALYPTUS-STD', 'WOOD-KAMERERE-STD',
    'TEAK', 'FABRIC', 'FOAM', 'CUSHION INSERT', 'HARDWARE', 'ACCESSORIES'
  ];

  useEffect(() => {
    if (isConnected) {
      fetchProfiles();
    }
  }, [isConnected]);

  const fetchProfiles = async () => {
    try {
      const res = await fetch(`${apiUrl}?action=getProfiles`);
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles.filter(p => p.status === 'PRODUCED'));
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const addComponent = () => {
    setComponents([...components, {
      id: Date.now(),
      mainComponent: '',
      subComponent: 'WOOD-ACACIA-STD',
      partName: '',
      profile: '',
      length: '',
      width: '',
      thickness: '',
      qty: '1',
      volumeM3: ''
    }]);
  };

  const updateComponent = (id, field, value) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const removeComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

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

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
            mainComponent: comp.mainComponent,
            subComponent: comp.subComponent,
            partName: comp.partName,
            profile: comp.profile,
            length: parseFloat(comp.length) || 0,
            width: parseFloat(comp.width) || 0,
            thickness: parseFloat(comp.thickness) || 0,
            qty: parseFloat(comp.qty) || 1,
            volumeM3: parseFloat(comp.volumeM3) || 0
          }))
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        alert('Error: ' + (data.error || 'Failed to process BOM'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting BOM: ' + error.message);
    }

    setSubmitting(false);
  };

  const resetForm = () => {
    setProductName('');
    setProductType('');
    setMainMaterial('');
    setComplexity('3');
    setPackaging({ length: '', width: '', height: '' });
    setComponents([]);
    setResult(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>BOM Creator</h2>

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

      {/* Product Information */}
      {!result && (
        <>
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
              <button className="btn btn-primary" onClick={addComponent}>
                <Plus size={16} /> Add Component
              </button>
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
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Main Component</th>
                      <th>Sub Component</th>
                      <th>Part Name</th>
                      <th>Profile</th>
                      <th>L (mm)</th>
                      <th>W (mm)</th>
                      <th>T (mm)</th>
                      <th>m³</th>
                      <th>Qty</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((comp) => (
                      <tr key={comp.id}>
                        <td>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g., FRAME"
                            value={comp.mainComponent}
                            onChange={(e) => updateComponent(comp.id, 'mainComponent', e.target.value)}
                            style={{ width: '100px' }}
                          />
                        </td>
                        <td>
                          <select 
                            className="form-select" 
                            value={comp.subComponent}
                            onChange={(e) => updateComponent(comp.id, 'subComponent', e.target.value)}
                            style={{ width: '140px' }}
                          >
                            {subComponentOptions.map(sc => (
                              <option key={sc} value={sc}>{sc}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Part name"
                            value={comp.partName}
                            onChange={(e) => updateComponent(comp.id, 'partName', e.target.value)}
                            style={{ width: '120px' }}
                          />
                        </td>
                        <td>
                          {comp.subComponent === 'ALUMINUM' ? (
                            <select 
                              className="form-select"
                              value={comp.profile}
                              onChange={(e) => updateComponent(comp.id, 'profile', e.target.value)}
                              style={{ width: '100px' }}
                            >
                              <option value="">Select...</option>
                              {profiles.map(p => (
                                <option key={p.id} value={`${p.width}x${p.height}`}>
                                  {p.type === 'ROUND' ? `Ø${p.width}` : `${p.width}x${p.height}`}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span style={{ color: '#999' }}>-</span>
                          )}
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="form-input" 
                            placeholder="0"
                            value={comp.length}
                            onChange={(e) => updateComponent(comp.id, 'length', e.target.value)}
                            style={{ width: '70px' }}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="form-input" 
                            placeholder="0"
                            value={comp.width}
                            onChange={(e) => updateComponent(comp.id, 'width', e.target.value)}
                            style={{ width: '70px' }}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="form-input" 
                            placeholder="0"
                            value={comp.thickness}
                            onChange={(e) => updateComponent(comp.id, 'thickness', e.target.value)}
                            style={{ width: '60px' }}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="form-input" 
                            placeholder="0"
                            value={comp.volumeM3}
                            onChange={(e) => updateComponent(comp.id, 'volumeM3', e.target.value)}
                            style={{ width: '80px' }}
                            step="0.0001"
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="form-input" 
                            value={comp.qty}
                            onChange={(e) => updateComponent(comp.id, 'qty', e.target.value)}
                            style={{ width: '50px' }}
                            min="1"
                          />
                        </td>
                        <td>
                          <button 
                            onClick={() => removeComponent(comp.id)}
                            style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', padding: '8px' }}
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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