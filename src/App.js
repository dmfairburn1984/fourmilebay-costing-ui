import React, { useState } from 'react';
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
  Wrench
} from 'lucide-react';

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
            Connected to Google Sheets
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34a853' }}></div>
            <span style={{ fontSize: '12px', color: '#34a853' }}>Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'bom' && <BOMCreator />}
        {activeTab === 'cost' && <CostAnalysis />}
        {activeTab === 'profiles' && <ProfileRegistry />}
        {activeTab === 'materials' && <MaterialsLibrary />}
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Dashboard Component
function Dashboard() {
  const stats = {
    totalProducts: 109,
    thisWeek: 7,
    avgVariance: 6.2,
    profilesProduced: 12,
    standardisationScore: 85
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard 
          icon={<Package />}
          value={stats.totalProducts}
          label="Total Products"
          color="#1a73e8"
        />
        <StatCard 
          icon={<Clock />}
          value={stats.thisWeek}
          label="Costed This Week"
          color="#34a853"
        />
        <StatCard 
          icon={<BarChart3 />}
          value={`${stats.avgVariance}%`}
          label="Avg Variance"
          color={stats.avgVariance <= 10 ? '#34a853' : '#ea4335'}
        />
        <StatCard 
          icon={<Wrench />}
          value={`${stats.standardisationScore}%`}
          label="Standardisation"
          color="#1a73e8"
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary">
            <FileText size={18} />
            New BOM
          </button>
          <button className="btn btn-secondary">
            <Calculator size={18} />
            Calculate Cost
          </button>
          <button className="btn btn-secondary">
            <Database size={18} />
            Update Materials
          </button>
        </div>
      </div>

      {/* Recent Products */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Products</h3>
          <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            View All
          </button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Material Cost</th>
                <th>Total Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SICILY-001</td>
                <td>Sicily Dining Table 180x90</td>
                <td>$73.63</td>
                <td>$126.68</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
              <tr>
                <td>DRAKE-001</td>
                <td>Drake Dining Chair - Kamerere</td>
                <td>$52.40</td>
                <td>$89.12</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
              <tr>
                <td>DEMPSEY-001</td>
                <td>Dempsey Dining Chair 1</td>
                <td>$50.87</td>
                <td>$86.55</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, value, label, color }) {
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
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// BOM Creator Component
function BOMCreator() {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [complexity, setComplexity] = useState('3');
  const [mainMaterial, setMainMaterial] = useState('');
  const [components, setComponents] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const productTypes = [
    'Dining Chair', 'Lounge Chair', 'Armchair', 'Sofa', 
    'Dining Table', 'Coffee Table', 'Side Table', 'Console Table'
  ];

  const mainMaterials = ['Aluminum', 'Wood', 'Aluminum + Wood', 'Aluminum + Rope'];

  const addComponent = () => {
    setComponents([...components, {
      id: Date.now(),
      mainComponent: '',
      subComponent: '',
      partName: '',
      profile: '',
      length: '',
      width: '',
      thickness: '',
      qty: 1
    }]);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>BOM Creator</h2>

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

      {/* Standardisation Warning Example */}
      {showWarning && (
        <div className="profile-warning">
          <div className="profile-warning-title">
            <AlertTriangle size={20} />
            New Profile Detected: ALU-PROFILE-55x30x1.6
          </div>
          <p className="profile-warning-text">
            Similar PRODUCED profiles exist: ALU-PROFILE-50x25x1.5 (used in 8 products)<br />
            ⚠️ Using a new profile requires new extrusion tooling (~$10,000).<br />
            Consider adjusting design to use an existing profile.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Use Existing Profile
            </button>
            <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Keep New Profile
            </button>
          </div>
        </div>
      )}

      {/* Component Entry */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">BOM Components</h3>
          <button className="btn btn-primary" onClick={addComponent}>
            + Add Component
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
          <div className="table-container">
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
                  <th>Qty</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {components.map((comp, index) => (
                  <ComponentRow 
                    key={comp.id} 
                    component={comp}
                    onShowWarning={() => setShowWarning(true)}
                  />
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
            <input type="number" className="form-input" placeholder="0" />
          </div>
          <div className="form-group">
            <label className="form-label">Width (cm)</label>
            <input type="number" className="form-input" placeholder="0" />
          </div>
          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input type="number" className="form-input" placeholder="0" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button className="btn btn-primary">
          <Calculator size={18} />
          Calculate Cost
        </button>
        <button className="btn btn-secondary">
          Save Draft
        </button>
      </div>
    </div>
  );
}

// Component Row for BOM
function ComponentRow({ component, onShowWarning }) {
  const subComponents = ['ALUMINUM', 'WOOD-ACACIA-STD', 'TEAK', 'FABRIC', 'CUSHION INSERT', 'HARDWARE', 'ACCESSORIES'];
  const profiles = ['40x20', '50x25', '20x20', 'Ø25', 'Ø60', 'PLATE 3MM', 'Custom...'];

  return (
    <tr>
      <td>
        <input type="text" className="form-input" placeholder="e.g., TOP FRAME" style={{ width: '120px' }} />
      </td>
      <td>
        <select className="form-select" style={{ width: '140px' }}>
          {subComponents.map(sc => (
            <option key={sc} value={sc}>{sc}</option>
          ))}
        </select>
      </td>
      <td>
        <input type="text" className="form-input" placeholder="Part name" style={{ width: '140px' }} />
      </td>
      <td>
        <select 
          className="form-select" 
          style={{ width: '100px' }}
          onChange={(e) => {
            if (e.target.value === 'Custom...') {
              onShowWarning();
            }
          }}
        >
          <option value="">-</option>
          {profiles.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </td>
      <td>
        <input type="number" className="form-input" placeholder="0" style={{ width: '70px' }} />
      </td>
      <td>
        <input type="number" className="form-input" placeholder="0" style={{ width: '70px' }} />
      </td>
      <td>
        <input type="number" className="form-input" placeholder="0" style={{ width: '60px' }} />
      </td>
      <td>
        <input type="number" className="form-input" defaultValue="1" style={{ width: '50px' }} />
      </td>
      <td>
        <button style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer' }}>
          ✕
        </button>
      </td>
    </tr>
  );
}

// Cost Analysis Component
function CostAnalysis() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Cost Analysis</h2>
      
      {/* Cost Summary */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="cost-summary">
          <div className="cost-summary-title">TOTAL COST</div>
          <div className="cost-summary-value">$126.68</div>
          <div className="cost-summary-subtitle">Factory price</div>
        </div>
        <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #34a853, #4caf50)' }}>
          <div className="cost-summary-title">SELLING PRICE</div>
          <div className="cost-summary-value">$157.09</div>
          <div className="cost-summary-subtitle">+24% margin</div>
        </div>
        <div className="cost-summary" style={{ background: 'linear-gradient(135deg, #5f6368, #757575)' }}>
          <div className="cost-summary-title">YOUR PROFIT</div>
          <div className="cost-summary-value">$30.40</div>
          <div className="cost-summary-subtitle">Per unit</div>
        </div>
      </div>

      {/* AI Confidence */}
      <div className="ai-confidence high">
        <CheckCircle size={24} color="#34a853" />
        <div>
          <strong>AI Confidence: HIGH (87%)</strong>
          <p style={{ fontSize: '14px', color: '#5f6368', marginTop: '4px' }}>
            Similar to Clayton Dining Table ($126.68). All profiles are PRODUCED. No anomalies detected.
          </p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">Cost Breakdown</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>% of Total</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. Material Cost</td>
                <td>$73.63</td>
                <td>58.1%</td>
                <td>Sum of all BOM components</td>
              </tr>
              <tr>
                <td>2. Labor Cost</td>
                <td>$14.73</td>
                <td>11.6%</td>
                <td>20% of materials (Complexity 1)</td>
              </tr>
              <tr>
                <td>3. Overhead</td>
                <td>$17.67</td>
                <td>13.9%</td>
                <td>20% of (Materials + Labor)</td>
              </tr>
              <tr style={{ background: '#f8f9fa' }}>
                <td><strong>Subtotal</strong></td>
                <td><strong>$106.03</strong></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>4. Packaging</td>
                <td>$12.38</td>
                <td>9.8%</td>
                <td>Box surface area</td>
              </tr>
              <tr>
                <td>5. Factory Profit</td>
                <td>$8.29</td>
                <td>6.5%</td>
                <td>7% margin</td>
              </tr>
              <tr style={{ background: '#e8f0fe', fontWeight: '600' }}>
                <td>TOTAL COST</td>
                <td>$126.68</td>
                <td>100%</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button className="btn btn-primary">
          <DollarSign size={18} />
          Request Factory Quote
        </button>
        <button className="btn btn-secondary">
          Export Cost Sheet
        </button>
        <button className="btn btn-secondary">
          Enter Actual Cost
        </button>
      </div>
    </div>
  );
}

// Profile Registry Component
function ProfileRegistry() {
  const profiles = [
    { id: 'ALU-PROFILE-40x20x1.7', type: 'RECTANGULAR', dims: '40×20×1.7', status: 'PRODUCED', products: 23 },
    { id: 'ALU-PROFILE-50x25x1.5', type: 'RECTANGULAR', dims: '50×25×1.5', status: 'PRODUCED', products: 8 },
    { id: 'ALU-PROFILE-20x20x1.4', type: 'RECTANGULAR', dims: '20×20×1.4', status: 'PRODUCED', products: 15 },
    { id: 'ALU-TUBE-Ø60x1.5', type: 'ROUND', dims: 'Ø60×1.5', status: 'PRODUCED', products: 4 },
    { id: 'ALU-TUBE-Ø25x1.5', type: 'ROUND', dims: 'Ø25×1.5', status: 'PRODUCED', products: 12 },
    { id: 'ALU-PROFILE-55x30x1.6', type: 'RECTANGULAR', dims: '55×30×1.6', status: 'NEW', products: 1 },
  ];

  const produced = profiles.filter(p => p.status === 'PRODUCED').length;
  const total = profiles.length;
  const score = Math.round(produced / total * 100);

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Profile Registry</h2>
      
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard 
          icon={<Wrench />}
          value={total}
          label="Total Profiles"
          color="#1a73e8"
        />
        <StatCard 
          icon={<CheckCircle />}
          value={produced}
          label="PRODUCED"
          color="#34a853"
        />
        <StatCard 
          icon={<AlertTriangle />}
          value={total - produced}
          label="NEW / Review"
          color="#fbbc04"
        />
        <StatCard 
          icon={<BarChart3 />}
          value={`${score}%`}
          label="Standardisation"
          color={score >= 90 ? '#34a853' : '#fbbc04'}
        />
      </div>

      {/* Profile Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Aluminum Profiles</h3>
          <button className="btn btn-primary">
            + Add Profile
          </button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Profile ID</th>
                <th>Type</th>
                <th>Dimensions</th>
                <th>Status</th>
                <th>Products Using</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id}>
                  <td><strong>{profile.id}</strong></td>
                  <td>{profile.type}</td>
                  <td>{profile.dims}</td>
                  <td>
                    <span className={`badge badge-${profile.status.toLowerCase()}`}>
                      {profile.status}
                    </span>
                  </td>
                  <td>{profile.products}</td>
                  <td>
                    {profile.status !== 'PRODUCED' && (
                      <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        Mark PRODUCED
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Standardisation Tips */}
      <div className="card" style={{ background: '#e8f5e9', border: '1px solid #c8e6c9' }}>
        <h4 style={{ marginBottom: '12px', color: '#2e7d32' }}>
          <CheckCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Standardisation Tips
        </h4>
        <ul style={{ paddingLeft: '20px', color: '#2e7d32' }}>
          <li>Target: 90%+ profiles should be PRODUCED</li>
          <li>Each new profile costs ~$10,000 in tooling</li>
          <li>Mark profiles as PRODUCED once tooling exists</li>
          <li>System will warn when new profiles are used</li>
        </ul>
      </div>
    </div>
  );
}

// Materials Library Component
function MaterialsLibrary() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Materials Library</h2>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Raw Materials</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search materials..." 
              style={{ width: '200px' }}
            />
            <button className="btn btn-primary">+ Add Material</button>
          </div>
        </div>
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
              <tr>
                <td>WOOD-ACACIA-STD</td>
                <td>WOOD</td>
                <td>Acacia Wood Standard</td>
                <td>m³</td>
                <td>$1,040.00</td>
                <td><span className="badge badge-produced">Ready</span></td>
              </tr>
              <tr>
                <td>WOOD-TEAK-STD</td>
                <td>WOOD</td>
                <td>Teak Wood Standard</td>
                <td>m³</td>
                <td>$2,200.00</td>
                <td><span className="badge badge-produced">Ready</span></td>
              </tr>
              <tr>
                <td>ALU-PROFILE-40x20x1.7</td>
                <td>ALUMINUM</td>
                <td>Aluminium Profile 40x20x1.7mm</td>
                <td>kg</td>
                <td>$2.20</td>
                <td><span className="badge badge-produced">Ready</span></td>
              </tr>
              <tr>
                <td>FABRIC-OUTDOOR-STD</td>
                <td>FABRIC</td>
                <td>Outdoor Fabric Standard</td>
                <td>m²</td>
                <td>$3.60</td>
                <td><span className="badge badge-produced">Ready</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Products List Component
function ProductsList() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Products</h2>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Product Index</h3>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search products..." 
            style={{ width: '250px' }}
          />
        </div>
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
              <tr>
                <td>SICILY-001</td>
                <td>Sicily Dining Table 180x90</td>
                <td>Dining Table</td>
                <td>$73.63</td>
                <td>$126.68</td>
                <td>$157.09</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
              <tr>
                <td>DRAKE-001</td>
                <td>Drake Dining Chair</td>
                <td>Dining Chair</td>
                <td>$52.40</td>
                <td>$89.12</td>
                <td>$110.51</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
              <tr>
                <td>DEMPSEY-001</td>
                <td>Dempsey Dining Chair 1</td>
                <td>Dining Chair</td>
                <td>$50.87</td>
                <td>$86.55</td>
                <td>$107.32</td>
                <td><span className="badge badge-complete">Complete</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Settings Page Component
function SettingsPage() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Settings</h2>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Costing Rules</h3>
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Factory Overhead %</label>
            <input type="number" className="form-input" defaultValue="20" />
          </div>
          <div className="form-group">
            <label className="form-label">Factory Profit %</label>
            <input type="number" className="form-input" defaultValue="7" />
          </div>
          <div className="form-group">
            <label className="form-label">Your Margin %</label>
            <input type="number" className="form-input" defaultValue="24" />
          </div>
          <div className="form-group">
            <label className="form-label">Target Variance %</label>
            <input type="number" className="form-input" defaultValue="10" />
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '16px' }}>
          Save Settings
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Google Sheets Connection</h3>
        </div>
        <p style={{ color: '#5f6368', marginBottom: '16px' }}>
          Connected to: Costing_Master_File_1
        </p>
        <button className="btn btn-secondary">
          Re-sync Data
        </button>
      </div>
    </div>
  );
}

export default App;
