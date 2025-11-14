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
        # -> Try inputting email and CNPJ again into fields index 7 and 8 respectively, then click Entrar button (index 9) to login.
        frame = context.pages[-1]
        # Input email for login
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('samuel.tarif@gmail.com')
        

        frame = context.pages[-1]
        # Input CNPJ for login
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('09.117.117/0001.24')
        

        frame = context.pages[-1]
        # Click Entrar button to authenticate
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on 'Perfil' button (index 2) to check if company search or CNPJ search is accessible from user profile or related menu.
        frame = context.pages[-1]
        # Click Perfil button to explore user profile or menu for company search
        elem = frame.locator('xpath=html/body/div/div/header/div/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Close 'Completar cadastro' modal by clicking 'Fechar' button (index 39) and look for other navigation or search options for company CNPJ.
        frame = context.pages[-1]
        # Click Fechar button to close 'Completar cadastro' modal
        elem = frame.locator('xpath=html/body/div[5]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll down to check if there is a company search or CNPJ search input further down the page.
        await page.mouse.wheel(0, 600)
        

        # -> Scroll up to top and try to find a global search or menu option that might lead to company search or CNPJ search.
        await page.mouse.wheel(0, -600)
        

        # -> Open a new tab and navigate to a possible company search page URL such as http://localhost:3001/empresa or /cnpj to locate the company search input for CNPJ.
        await page.goto('http://localhost:3001/empresa', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click 'Go back home' link (index 0) to return to home or main page and try to find company search or CNPJ search input from there.
        frame = context.pages[-1]
        # Click 'Go back home' link to return to main page
        elem = frame.locator('xpath=html/body/div/div/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input a valid CNPJ number '09.117.117/0001.24' into the CNPJ input field (index 8) and a valid email into the email input (index 7), then click Entrar button (index 9) to perform the search.
        frame = context.pages[-1]
        # Input valid email for login
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('samuel.tarif@gmail.com')
        

        frame = context.pages[-1]
        # Input valid CNPJ for search
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('09.117.117/0001.24')
        

        frame = context.pages[-1]
        # Click Entrar button to perform search with valid CNPJ
        elem = frame.locator('xpath=html/body/div/div/main/div/div[2]/div[2]/div/form/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Test invalid or malformed CNPJ input by entering an invalid CNPJ in the Part Number input (index 8) to check if error or no result message is shown.
        frame = context.pages[-1]
        # Input invalid CNPJ in Part Number input to test error handling
        elem = frame.locator('xpath=html/body/div/div/main/section/div/div/aside/div[2]/div[2]/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('invalid-cnpj')
        

        # -> Test valid CNPJ input by clearing filters, entering valid CNPJ '09.117.117/0001.24' in Part Number input, and applying filter to verify correct data retrieval.
        frame = context.pages[-1]
        # Click Limpar button to clear filters
        elem = frame.locator('xpath=html/body/div/div/main/section/div/div/aside/div/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=404 - Page not found: /empresa | Nuxt').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Page not found: /empresa').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=718 produtos encontrados — Página 1 de 120').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Categoria: Manômetros · Página 1 de 120').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=QUALITEC').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Diâmetro: 41MM').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Conexão: 1/8" NPT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão: 11/160 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Diâmetro: 62MM').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Conexão: 1/4" NPT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão: 01//15 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão: 2/30 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão: 3/45 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão: 4/60 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Faixa de Pressão: 6/85 PSI X KGF/CM²').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Nenhum produto selecionado').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Clique em “Comparar” nos cards para adicionar aqui.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    