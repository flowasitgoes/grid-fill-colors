import { SfxEvent } from '../models/sfx-event';

type AudioGroup = 'master' | 'ui' | 'sfx' | 'env';

export interface SfxConfigEntry {
  files: string[];
  group: AudioGroup;
  volume?: number;
  playbackRate?: {
    min: number;
    max: number;
  };
}

export const SFX_CONFIG: Record<SfxEvent, SfxConfigEntry> = {
  [SfxEvent.UiClick]: {
    files: ['assets/audio/ui/ui_click_01.mp3'],
    group: 'ui',
    playbackRate: { min: 0.95, max: 1.05 },
  },
  [SfxEvent.UiPopupOpen]: {
    files: ['assets/audio/ui/ui_popup_open.mp3'],
    group: 'ui',
  },
  [SfxEvent.UiPopupClose]: {
    files: ['assets/audio/ui/ui_popup_close.mp3'],
    group: 'ui',
  },
  [SfxEvent.UiChooseAndClick]: {
    files: ['assets/audio/ui/ui_choose_and_click.mp3'],
    group: 'ui',
  },
  [SfxEvent.UiHover]: {
    files: ['assets/audio/ui/ui_cursor_hoversound.mp3'],
    group: 'ui',
    volume: 1.2,
  },
  [SfxEvent.UiAlertIncomplete]: {
    files: ['assets/audio/ui/ui_alert_incomplete.mp3'],
    group: 'ui',
    volume: 0.85,
  },
  [SfxEvent.GameFillBasic]: {
    files: ['assets/audio/gameplay/fill_basic_paint.mp3'],
    group: 'sfx',
    volume: 1.18,
    playbackRate: { min: 0.94, max: 1.08 },
  },
  [SfxEvent.GameFillStreak]: {
    files: ['assets/audio/gameplay/fill_streak_paint.mp3'],
    group: 'sfx',
    volume: 1.12,
    playbackRate: { min: 0.96, max: 1.12 },
  },
  [SfxEvent.GameEraser]: {
    files: ['assets/audio/gameplay/eraser_swipe_01.mp3'],
    group: 'sfx',
  },
  [SfxEvent.GameHintSuccess]: {
    files: ['assets/audio/gameplay/hint_success_01.mp3'],
    group: 'sfx',
  },
  [SfxEvent.GameCheckSuccessLayers]: {
    files: ['assets/audio/gameplay/check_success_layers.mp3'],
    group: 'sfx',
  },
  [SfxEvent.GameCheckSuccessCrowd]: {
    files: ['assets/audio/gameplay/check_success_crowd.mp3'],
    group: 'sfx',
    volume: 0.85,
  },
  [SfxEvent.GameCheckFailure]: {
    files: ['assets/audio/gameplay/check_failure_01.mp3'],
    group: 'sfx',
  },
  [SfxEvent.GameCheckIncomplete]: {
    files: ['assets/audio/gameplay/check_incomplete_01.mp3'],
    group: 'sfx',
  },
  [SfxEvent.GameFinishFireworks]: {
    files: ['assets/audio/gameplay/finish_fireworks.mp3'],
    group: 'sfx',
  },
  [SfxEvent.SystemCurrencyGain]: {
    files: ['assets/audio/system/currency_gain_01.mp3'],
    group: 'sfx',
  },
  [SfxEvent.SystemCurrencySpend]: {
    files: ['assets/audio/system/currency_spend_01.mp3'],
    group: 'sfx',
  },
  [SfxEvent.EnvLoadingBubbles]: {
    files: ['assets/audio/env/loading_bubbles_loop.mp3'],
    group: 'env',
    volume: 0.45,
  },
  [SfxEvent.EnvLevelAtmos]: {
    files: ['assets/audio/env/level_atmos_loop.mp3'],
    group: 'env',
    volume: 0.5,
  },
};

