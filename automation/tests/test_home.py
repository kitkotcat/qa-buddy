from playwright.sync_api import Page, expect


def test_onboarding_is_shown_for_new_user(page: Page):
    # Открываем приложение как новый пользователь
    page.goto("http://localhost:5173")

    # Проверяем основной заголовок onboarding
    heading = page.get_by_role(
        "heading",
        name="С чего начнём подготовку?",
    )

    expect(heading).to_be_visible()


def test_new_user_can_skip_onboarding_and_open_home(page: Page):
    # Открываем приложение как новый пользователь без сохранённого состояния
    page.goto("http://localhost:5173")

    # Проверяем, что для нового пользователя действительно показан onboarding
    onboarding_heading = page.get_by_role(
        "heading",
        name="С чего начнём подготовку?",
    )
    expect(onboarding_heading).to_be_visible()

    # Пользователь пропускает первичную настройку
    skip_button = page.get_by_role(
        "button",
        name="Пропустить",
    )
    skip_button.click()

    # После onboarding пользователь должен попасть на главную страницу
    home_content = page.get_by_text(
        "Твой личный помощник для практики QA",
        exact=True,
    )
    expect(home_content).to_be_visible()
