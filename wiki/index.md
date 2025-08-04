---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Together C & C++"
  tagline: A C & C++ Community
---

<style lang="scss">
.home-main {
    font-size: 24px;
    padding: 0 40px;

    p {
        line-height: 1.5em;
    }

    .buttons {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;

        .button {
            padding: 12px;
            text-decoration: none;
            font-size: 24px;
            border-radius: 40px;
            padding: 12px 30px;

            &.discord {
                color: #ffffff;
                background: #5865F2;

                .discord-icon {
                    margin-right: 7px;
                    transform: scale(1.2);
                }
            }

            &.resources {
                color: #ffffff;
                background: #b721ff;

                .discord-icon {
                    margin-right: 7px;
                    transform: scale(1.2);
                }
            }
        }
    }
}
</style>

<div class="home-main">
    <p>
        Welcome to Together C & C++, a Discord-based community connecting C and C++ developers from around the globe and
        from diverse backgrounds.
    </p>
    <div class="buttons">
        <a class="button discord" href="https://discord.gg/tccpp">
            <font-awesome-icon :icon="['fab', 'discord']" class="discord-icon" /> Join the Discord
        </a>
        <a class="button resources" href="resources">
            Explore our resources
        </a>
    </div>
</div>
