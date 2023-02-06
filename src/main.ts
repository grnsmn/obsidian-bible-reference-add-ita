import { Plugin } from "obsidian";
import {
  APP_NAMING,
  BibleReferencePluginSettings,
  DEFAULT_SETTINGS,
} from "./data/constants";
import { BibleReferenceSettingTab } from "./ui/BibleReferenceSettingTab";
import { VerseEditorSuggestor } from "./suggesetor/VerseEditorSuggestor";
import { VerseSuggestModal } from "./suggesetor/VerseSuggestModal";

export default class BibleReferencePlugin extends Plugin {
  settings: BibleReferencePluginSettings;
  suggestModal: VerseSuggestModal;

  async onload() {
    console.log("loading plugin -", APP_NAMING.appName);

    await this.loadSettings();
    this.suggestModal = new VerseSuggestModal(this.app, this.settings);
    this.addSettingTab(new BibleReferenceSettingTab(this.app, this));
    this.registerEditorSuggest(new VerseEditorSuggestor(this, this.settings));
    this.addCommand({
      id: "obr-lookup",
      name: "Verse Lookup",
      callback: () => {
        this.suggestModal.open();
      },
    });
  }

  onunload() {
    console.log("unloading plugin", APP_NAMING.appName);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    console.debug(this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
