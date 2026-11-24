import { useEffect, useState } from 'react';
import SettlementModal from './SettlementModal';
import BankModal from './BankModal';
import {
  checksToCompletedStepIds,
  DEFAULT_ORGANIZATION_CHECKS,
  type OrganizationChecks,
} from './util';

export interface OnboardingModalProps {
  firstName?: string;
  checks?: OrganizationChecks;
  onStepSaved?: () => void;
  onNavigate?: (view: string) => void;
  onClose?: () => void;
}

interface OnboardingStep {
  id: number;
  title: string;
  duration?: string;
  subtitle: string;
  status: string;
}

type ActiveModalType = 'welcome' | 'settlement' | 'bank';

export default function OnboardingModal({
  firstName,
  checks = DEFAULT_ORGANIZATION_CHECKS,
  onStepSaved,
  onNavigate,
  onClose,
}: OnboardingModalProps) {
  const [activeModal, setActiveModal] = useState<ActiveModalType>('welcome');
  const [completedSteps, setCompletedSteps] = useState<number[]>(() =>
    checksToCompletedStepIds(checks)
  );

  useEffect(() => {
    setCompletedSteps(checksToCompletedStepIds(checks));
  }, [checks]);

  const handleSaveStep = (stepId: number) => {
    setCompletedSteps((prev) => [...new Set([...prev, stepId])]);
    setActiveModal('welcome');
    onStepSaved?.();
  };

  const isStepCompleted = (id: number) => completedSteps.includes(id);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Organisation profile',
      duration: '4 mins',
      subtitle: 'Your organisation profile has been setup',
    },
    {
      id: 2,
      title: 'Settlement configuration',
      duration: '2 mins',
      subtitle: 'Configure how and when earnings are paid.',
    },
    {
      id: 3,
      title: 'Organisation bank account',
      duration: '2 mins',
      subtitle: "Where your organisation's retained earnings will be paid",
    },
    {
      id: 4,
      title: 'Bus stops',
      subtitle: 'Define all pickup and drop off points',
    },
    {
      id: 5,
      title: 'Routes pricing',
      subtitle: 'Set fares between stops',
    },
    {
      id: 6,
      title: 'Add your first driver',
      subtitle: 'Invite at least one driver to go live',
    },
  ].map((step) => {
    let status = '';

    if (isStepCompleted(step.id)) {
      status = 'completed';
    } else if (step.id === 1 || step.id === 2 || step.id === 3) {
      status = 'current';
    } else if (step.id === 4) {
      status = isStepCompleted(2) && isStepCompleted(3) ? 'current' : 'After 2 & 3';
    } else if (step.id === 5) {
      status = isStepCompleted(4) ? 'current' : 'After 4';
    } else if (step.id === 6) {
      status = isStepCompleted(5) ? 'current' : 'After 5';
    }

    return { ...step, status };
  });

  if (activeModal === 'settlement') {
    return <SettlementModal onSave={() => handleSaveStep(2)} />;
  }

  if (activeModal === 'bank') {
    return <BankModal onSave={() => handleSaveStep(3)} />;
  }

  const handleStart = (stepId: number) => {
    if (stepId === 1) {
      onNavigate?.('/signup/organization');
      return;
    }
    if (stepId === 2) {
      setActiveModal('settlement');
      return;
    }
    if (stepId === 3) {
      setActiveModal('bank');
      return;
    }
    if (stepId === 4) {
      onNavigate?.('bus-stops');
      return;
    }
    if (stepId === 5) {
      onNavigate?.('routes');
      return;
    }
    if (stepId === 6) {
      onNavigate?.('drivers');
    }
  };

  const nextActionStep = steps.find((step) => step.status === 'current');

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header" style={{ position: 'relative' }}>
          {onClose && (
            <button
              className="icon-btn"
              onClick={onClose}
              style={{ position: 'absolute', top: 0, right: 0, padding: '0.25rem' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '20px', height: '20px' }}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <h2 className="modal-title">Welcome to Riyder, {firstName || 'User'}</h2>
          <p className="modal-subtitle">Let's get you started.</p>
        </div>

        <div className="modal-divider"></div>

        <div className="modal-content">
          {steps.map((step) => (
            <div key={step.id} className="step-item">
              <div className="step-icon">
                {step.status === 'completed' ? (
                  <svg viewBox="0 0 24 24" fill="#10b981" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" stroke="none"></circle>
                    <path d="M8 12l3 3 5-5" strokeWidth="2.5"></path>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                )}
              </div>

              <div className="step-details">
                <div className="step-title-row">
                  <span className={`step-title ${step.status === 'completed' ? 'strikethrough text-gray' : ''}`}>
                    {step.id}. {step.title}
                  </span>
                  {step.duration && <span className="step-badge">{step.duration}</span>}
                </div>
                <div className="step-desc">{step.subtitle}</div>
              </div>

              <div className="step-action">
                {(step.status === 'current' || step.status === 'next') && (
                  <button className="btn-start" onClick={() => handleStart(step.id)}>
                    Start
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                )}
                {step.status.startsWith('After') && <span className="step-status-text">{step.status}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          {nextActionStep ? (
            <button className="btn-primary" onClick={() => handleStart(nextActionStep.id)}>
              {nextActionStep.title}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          ) : (
            onClose && (
              <button className="btn-primary" onClick={onClose}>
                Done
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
