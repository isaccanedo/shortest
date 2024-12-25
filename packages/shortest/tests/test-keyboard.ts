import { BrowserManager } from '../src/browser/manager';
import { BrowserTool } from '../src/browser/core/browser-tool';
import { getConfig, initialize } from '../src/index';
import pc from 'picocolors';

async function testKeyboard() {
  const browserManager = new BrowserManager(getConfig());

  try {
    await initialize();
    console.log(pc.cyan('\n🚀 Launching browser...'));
    const context = await browserManager.launch();
    const page = context.pages()[0];

    const browserTool = new BrowserTool(
      page,
      browserManager,
      {
        width: 1920,
        height: 1080
      }
    );

    // Test 1: Test Page_Down key (exactly as AI sends it)
    console.log(pc.cyan('\nTest 1: Testing Page_Down key'));
    const pageDownResult = await browserTool.execute({ 
      action: 'key',
      text: 'Page_Down'
    });
    console.log(pc.yellow('Page_Down Result:'), pageDownResult);

    // Test 2: Test Page_Up key
    console.log(pc.cyan('\nTest 2: Testing Page_Up key'));
    const pageUpResult = await browserTool.execute({
      action: 'key',
      text: 'Page_Up'
    });
    console.log(pc.yellow('Page_Up Result:'), pageUpResult);

    // Test 3: Test lowercase variation
    console.log(pc.cyan('\nTest 3: Testing lowercase page_down'));
    const lowercaseResult = await browserTool.execute({
      action: 'key',
      text: 'page_down'
    });
    console.log(pc.yellow('Lowercase Result:'), lowercaseResult);

    // Test 4: Print current keyboard shortcuts mapping
    console.log(pc.cyan('\nCurrent Keyboard Shortcuts Configuration:'));
    const { keyboardShortcuts } = await import('../src/browser/actions');
    console.log(keyboardShortcuts);

  } catch (error) {
    console.error(pc.red('\n❌ Test failed:'), error);
  } finally {
    console.log(pc.cyan('\n🧹 Cleaning up...'));
    await browserManager.close();
  }
}

console.log(pc.cyan('🧪 Keyboard Handling Test'));
console.log(pc.cyan('======================='));
testKeyboard().catch(console.error); 