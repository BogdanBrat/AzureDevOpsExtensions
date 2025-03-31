document.addEventListener("DOMContentLoaded", function () {
    VSS.init({
        explicitNotifyLoaded: true,
        usePlatformStyles: true
    });

    VSS.require(["TFS/Dashboards/WidgetHelpers"], function (WidgetHelpers) {
        WidgetHelpers.IncludeWidgetConfigurationStyles();

        VSS.register("HarvestHoursWidget.Configuration", function () {
            var $harvestAccountId = document.getElementById("harvestAccountId");
            var $authToken = document.getElementById("authToken");
            var $rndFilter = document.getElementById("rndFilter"); // R&D Filter Field
            var $displayMode = document.getElementById("displayMode");
            var $billableLabel = document.getElementById("billableLabel");
            var $internalLabel = document.getElementById("internalLabel");
            var $rndLabel = document.getElementById("rndLabel"); // R&D Label Field
            var $billableColor = document.getElementById("billableColor");
            var $internalColor = document.getElementById("internalColor");
            var $rndColor = document.getElementById("rndColor");
            var $timePeriod = document.getElementById("timePeriod"); // Time Period Field
            var $theme = document.getElementById("themeSelector"); // Theme Selection Field
            var $productSupportFilter = document.getElementById("productSupportFilter");
            var $productSupportLabel = document.getElementById("productSupportLabel");
            var $productSupportColor = document.getElementById("productSupportColor"); // Product Support Filter Field
            var $unbilledFilter = document.getElementById("unbilledFilter");
            var $unbilledLabel = document.getElementById("unbilledLabel");
            var $unbilledColor = document.getElementById("unbilledColor");

            function validateField(field) {
                if (field) {
                    var error = field.nextElementSibling;
                    if (field.value.trim() === "" && (field === $harvestAccountId || field === $authToken)) {
                        if (error) error.style.visibility = "visible";
                    } else {
                        if (error) error.style.visibility = "hidden";
                    }
                }
            }

            function notifyConfigurationChange(context) {
                try {
                    var customSettings = {
                        data: JSON.stringify({
                            harvestAccountId: $harvestAccountId ? $harvestAccountId.value.trim() : "",
                            authToken: $authToken ? $authToken.value.trim() : "",
                            rndFilter: $rndFilter ? $rndFilter.value.trim() : "R&D", // R&D Filter
                            displayMode: $displayMode ? $displayMode.value : "",
                            billableLabel: $billableLabel ? $billableLabel.value.trim() : "Billable",
                            internalLabel: $internalLabel ? $internalLabel.value.trim() : "Internal",
                            rndLabel: $rndLabel ? $rndLabel.value.trim() : "R&D", // R&D Label
                            billableColor: $billableColor ? $billableColor.value : "#852d9d",
                            internalColor: $internalColor ? $internalColor.value : "#ec0bb7",
                            rndColor: $rndColor ? $rndColor.value : "#76f5ff",
                            timePeriod: $timePeriod ? $timePeriod.value : "7", // Time Period
                            theme: $theme ? $theme.value : "light", // Theme Selection
                            productSupportLabel: $productSupportLabel ? $productSupportLabel.value.trim() : "Product",
                            productSupportFilter: $productSupportFilter ? $productSupportFilter.value.trim() : "PRODUCT_SUPPORT",
                            productSupportColor: $productSupportColor ? $productSupportColor.value : "#FFD700",
                            unbilledFilter: $unbilledFilter ? $unbilledFilter.value.trim() : "Unbilled",
                            unbilledLabel: $unbilledLabel ? $unbilledLabel.value.trim() : "Unbilled",
                            unbilledColor: $unbilledColor ? $unbilledColor.value : "#27CA12"

                        })
                    };
                
                    console.log("Custom Settings for Notify:", customSettings);

                    if (context && typeof context.notify === "function") {
                        context.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(customSettings));
                    } else {
                        console.error("Configuration context does not support notify.");
                    }
                } catch (error) {
                    console.error("Error in notifyConfigurationChange:", error);
                }
            }

            function applyTheme(theme) {
                const bodyElement = document.body;
                const widgetElement = document.querySelector(".widget");

                if (!bodyElement) {
                    console.error("Body element is not found.");
                    return;
                }

                bodyElement.classList.remove("light-theme", "dark-theme");

                if (theme === "dark") {
                    bodyElement.classList.add("dark-theme");
                } else {
                    bodyElement.classList.add("light-theme");
                }

                if (widgetElement) {
                    widgetElement.classList.remove("light-theme", "dark-theme");
                    widgetElement.classList.add(`${theme}-theme`);
                } else {
                    console.error("Widget element not found.");
                }
            }

            function bindEvents(context) {
                const fields = [
                    $harvestAccountId,
                    $authToken,
                    $rndFilter,
                    $displayMode,
                    $billableLabel,
                    $internalLabel,
                    $rndLabel,
                    $billableColor,
                    $internalColor,
                    $rndColor,
                    $timePeriod,
                    $productSupportLabel,
                    $productSupportFilter,
                    $productSupportColor,
                    $unbilledLabel, 
                    $unbilledFilter, 
                    $unbilledColor,
                ];

                fields.forEach(function (field) {
                    if (field) {
                        field.addEventListener("input", function () {
                            validateField(field);
                            notifyConfigurationChange(context);
                        });
                    }
                });

                if ($theme) {
                    $theme.addEventListener("change", function () {
                        applyTheme($theme.value);
                        notifyConfigurationChange(context);
                    });
                }

                if ($displayMode || $timePeriod) {
                    [$displayMode, $timePeriod].forEach(function (field) {
                        field.addEventListener("change", function () {
                            notifyConfigurationChange(context);
                        });
                    });
                }
            }

            return {
                load: function (widgetSettings, widgetConfigurationContext) {
                    var settings = JSON.parse(widgetSettings.customSettings.data || "{}");
                    if ($harvestAccountId) $harvestAccountId.value = settings.harvestAccountId || "";
                    if ($authToken) $authToken.value = settings.authToken || "";
                    if ($rndFilter) $rndFilter.value = settings.rndFilter || "R&D"; // R&D Filter
                    if ($productSupportFilter) $productSupportFilter.value = settings.productSupportFilter || "PRODUCT_SUPPORT";
                    if ($unbilledFilter) $unbilledFilter.value = settings.unbilledFilter || "Unbilled";
                    if ($displayMode) $displayMode.value = settings.displayMode || "hours";
                    if ($billableLabel) $billableLabel.value = settings.billableLabel || "Billable";
                    if ($internalLabel) $internalLabel.value = settings.internalLabel || "Internal";
                    if ($productSupportLabel) $productSupportLabel.value = settings.productSupportLabel || "Product";
                    if ($unbilledLabel) $unbilledLabel.value = settings.unbilledLabel || "Unbilled";
                    if ($rndLabel) $rndLabel.value = settings.rndLabel || "R&D"; // R&D Label
                    if ($billableColor) $billableColor.value = settings.billableColor || "#852d9d";
                    if ($internalColor) $internalColor.value = settings.internalColor || "#ec0bb7";
                    if ($rndColor) $rndColor.value = settings.rndColor || "#76f5ff";
                    if ($productSupportColor) $productSupportColor.value = settings.productSupportColor || "#FFD700";
                    if ($unbilledColor) $unbilledColor.value = settings.unbilledColor || "#27CA12";
                    if ($timePeriod) $timePeriod.value = settings.timePeriod || "7"; // Time Period
                    if ($theme) $theme.value = settings.theme || "light"; // Load Theme

                    applyTheme(settings.theme || "light");

                    validateField($harvestAccountId);
                    validateField($authToken);

                    VSS.resize();

                    bindEvents(widgetConfigurationContext);
                    notifyConfigurationChange(widgetConfigurationContext);

                    return WidgetHelpers.WidgetStatusHelper.Success();
                },
                onSave: function () {
                    validateField($harvestAccountId);
                    validateField($authToken);

                    if (($harvestAccountId && $harvestAccountId.value.trim() === "") || ($authToken && $authToken.value.trim() === "")) {
                        console.error("Validation failed: Required fields are empty.");
                        return WidgetHelpers.WidgetStatusHelper.Failure("Validation error: fields cannot be empty.");
                    }

                    var customSettings = {
                        data: JSON.stringify({
                            harvestAccountId: $harvestAccountId ? $harvestAccountId.value.trim() : "",
                            authToken: $authToken ? $authToken.value.trim() : "",
                            rndFilter: $rndFilter ? $rndFilter.value.trim() : "R&D", // R&D Filter
                            displayMode: $displayMode ? $displayMode.value : "",
                            billableLabel: $billableLabel ? $billableLabel.value.trim() : "Billable",
                            internalLabel: $internalLabel ? $internalLabel.value.trim() : "Internal",
                            rndLabel: $rndLabel ? $rndLabel.value.trim() : "R&D", // R&D Label
                            billableColor: $billableColor ? $billableColor.value : "#852d9d",
                            internalColor: $internalColor ? $internalColor.value : "#ec0bb7",
                            rndColor: $rndColor ? $rndColor.value : "#76f5ff",
                            timePeriod: $timePeriod ? $timePeriod.value : "7", // Time Period
                            theme: $theme ? $theme.value : "light", // Theme Selection
                            productSupportLabel: $productSupportLabel ? $productSupportLabel.value.trim() : "Product",
                            productSupportFilter: $productSupportFilter ? $productSupportFilter.value.trim() : "PRODUCT_SUPPORT",
                            productSupportColor: $productSupportColor ? $productSupportColor.value : "#FFD700",
                            unbilledFilter: $unbilledFilter ? $unbilledFilter.value.trim() : "Unbilled",
                            unbilledLabel: $unbilledLabel ? $unbilledLabel.value.trim() : "Unbilled",
                            unbilledColor: $unbilledColor ? $unbilledColor.value : "#27CA12",

                        })
                    };

                    console.log("Saving Settings:", customSettings); // Debugging output

                    return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
                }
            };
        });

        VSS.notifyLoadSucceeded();
    });
});