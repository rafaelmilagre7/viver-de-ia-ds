import { NavLink } from 'react-router-dom';
import { navigation } from '../data/nav';

export default function Sidebar() {
  return (
    <aside className="vds-sidebar" aria-label="Navegação do design system">
      {navigation.map((group) => (
        <div key={group.label} className="vds-sidebar-group">
          <div className="vds-sidebar-eyebrow">
            <span className="vds-sidebar-eyebrow-ico">
              <group.icon size={14} strokeWidth={1.8} />
            </span>
            <span>{group.label}</span>
          </div>
          <ul className="vds-sidebar-list">
            {group.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    'vds-sidebar-link' + (isActive ? ' active' : '')
                  }
                >
                  <span>{item.label}</span>
                  {item.soon && <span className="vds-sidebar-soon">em breve</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
