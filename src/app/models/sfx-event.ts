export enum SfxEvent {
  UiClick = 'ui.click',
  UiPopupOpen = 'ui.popup.open',
  UiPopupClose = 'ui.popup.close',
  UiChooseAndClick = 'ui.choose.click',
  UiAlertIncomplete = 'ui.alert.incomplete',

  GameFillBasic = 'game.fill.basic',
  GameFillStreak = 'game.fill.streak',
  GameEraser = 'game.eraser',
  GameHintSuccess = 'game.hint.success',
  GameCheckSuccessLayers = 'game.check.success.layers',
  GameCheckSuccessCrowd = 'game.check.success.crowd',
  GameCheckFailure = 'game.check.failure',
  GameCheckIncomplete = 'game.check.incomplete',
  GameFinishFireworks = 'game.finish.fireworks',

  SystemCurrencyGain = 'system.currency.gain',
  SystemCurrencySpend = 'system.currency.spend',

  EnvLoadingBubbles = 'env.loading.bubbles',
  EnvLevelAtmos = 'env.level.atmos',
}

