import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3001", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click ripple-effect buttons if any exist on the login page to verify ripple animation.
        frame = context.pages[-1]
        # Click the 'Entrar' button to check for ripple effect animation on user interaction.
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Navigate to /produtos page to check for neon glow, shimmer, and ripple effects on advanced UI components.
        await page.goto('http://localhost:3001/produtos', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click ripple-effect buttons on /produtos page to verify ripple animation on user interaction.
        frame = context.pages[-1]
        # Click 'Detalhes' button on first product card to check for ripple effect animation.
        elem = frame.locator('xpath=html/body/div/div/main/section/div/div/div/div/div[2]/div/div/div/div[2]/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Check for ripple effect animation on buttons inside the product details modal, such as quantity increment/decrement and close buttons.
        frame = context.pages[-1]
        # Click quantity decrement button in product details modal to check for ripple effect animation.
        elem = frame.locator('xpath=html/body/div[3]/div[2]/div/div[5]/div[2]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click quantity increment button in product details modal to check for ripple effect animation.
        frame = context.pages[-1]
        # Click quantity increment button in product details modal to check for ripple effect animation.
        elem = frame.locator('xpath=html/body/div[3]/div[2]/div/div[5]/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Close the product details modal by clicking the close button to continue testing other pages/components.
        frame = context.pages[-1]
        # Click close button (×) in product details modal to close it.
        elem = frame.locator('xpath=html/body/div[3]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Navigate to /comparar page to check for neon glow, shimmer, and ripple effects on advanced UI components.
        await page.goto('http://localhost:3001/comparar', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click 'Voltar aos Produtos' button to navigate back to /produtos page and select products for comparison to enable comparison UI components with effects.
        frame = context.pages[-1]
        # Click 'Voltar aos Produtos' button to go back to /produtos page to select products for comparison.
        elem = frame.locator('xpath=html/body/div/div/main/div/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Comparar' buttons on two different product cards to add them to comparison and enable comparison UI components with effects.
        frame = context.pages[-1]
        # Click 'Comparar' button on first product card to add product to comparison.
        elem = frame.locator('xpath=html/body/div/div/main/section/div/div/div/div/div[2]/div/div/div/div[2]/div[3]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Comparar' button on second product card to add another product to comparison.
        frame = context.pages[-1]
        # Click 'Comparar' button on second product card to add product to comparison.
        elem = frame.locator('xpath=html/body/div/div/main/section/div/div/div/div/div[2]/div/div/div[2]/div[2]/div[3]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Filtros').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=718 produtos encontrados — Página 1 de 120').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Categoria').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todas as categorias').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Manômetros').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Part Number').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Trabalho').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todas as faixas (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=01//15 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=10/150 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=100/1500 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1000/15000 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=11/160 (2)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=14/200 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=140/2000 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=16/230 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1600/23000 (12)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2/30 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=20/300 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=200/3000 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=25/350 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=28/400 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3/45 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=300/4500 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=4/60 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=40/600 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=400/6000 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=6/85 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=600/8500 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=7/100 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=70/1000 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=700/10000 (32)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Fabricante').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todos (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=QUALITEC (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tipo de Medição').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todos (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=RELATIVO (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Diâmetro de Montagem').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todos (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=100MM (180)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=114MM (180)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=160MM (180)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=41MM (2)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=62MM (176)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Posição de Montagem').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todos (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ANGULAR CONCENTRICO (TRASEIRO) (222)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ANGULAR EXCENTRICO (TRASEIRO) (138)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=RETO (INFERIOR) (358)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Conexão do Instrumento').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Todos (718)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1/2" NPT (540)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1/4" NPT (176)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1/8" NPT (2)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Expandir filtros').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Catálogo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Resultados atuais conforme filtros.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Categoria: Manômetros · Página 1 de 120').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=718 produtos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=QUALITEC').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Diâmetro:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=41MM').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Conexão:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1/8" NPT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=11/160 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Detalhes').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Comparar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Aplicações').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Info. Técnicas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Carrinho').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Diâmetro:').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=62MM').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Conexão:').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1/4" NPT').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão:').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=01//15 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Comparar Produtos (2/3)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Limpar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=120.04122-0011KG/PSI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=QUALITEC').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=120.06214-0001KG/PSI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=QUALITEC').nth(2)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Comparar Produtos').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    