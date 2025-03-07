# Harvest Billing Widget

The Harvest Billing Widget is an Azure DevOps dashboard tool that visualizes billable, internal (non-billable), and R&D hours logged through the Harvest app. This widget helps teams efficiently track and manage time spent on various project categories.

![Pie Chart](https://raw.githubusercontent.com/BogdanBrat/DevOpsWidgetHarvestHours/main/docs/pie-chart.png)

## Features

- **Billable Hours**: Displays hours that are chargeable to clients or projects, providing insight into revenue-generating activities.
- **Internal Hours**: Tracks hours dedicated to internal tasks such as meetings, training, and administration, crucial for understanding resource allocation.
- **R&D Hours**: Captures hours for research and development projects, identified by a project code containing "R&D", regardless of whether these hours are billable or internal.
- **Customizable Sector Colors**: Allows you to select custom colors for the billable, internal, and R&D sectors of the pie chart, enabling better visual alignment with your dashboard's theme.
- **Customizable Sector Labels**: Provides the option to rename the labels for the billable, internal, and R&D sectors to match your organization's terminology.

## Configuration

To configure the widget, click on the gear icon in the widget's header. You'll need to provide:

- **Harvest Account ID**: This is your unique account identifier for the Harvest app, which is required to fetch time entries.
- **Authorization Token**: A personal access token necessary for authenticating requests to the Harvest API.
- **Display Mode**: Choose between displaying data as a percentage or in absolute hours.
- **Widget Title**: Customize the title displayed on the widget to suit your needs.
- **Widget Size**: Adjust the size of the widget to fit your dashboard layout.
- **Sector Colors**: Select your preferred colors for the billable, internal, and R&D sectors of the pie chart.
- **Sector Labels**: Customize the labels for the billable, internal, and R&D sectors according to your preference.

### Obtaining Harvest Account ID and Authorization Token

To get the necessary credentials:

1. Log in to your Harvest account.
2. Go to your profile by clicking your name in the upper right corner and select `My Profile`.
3. Navigate to `Settings` > `Security` > `Go to Harvest ID security settings` > `Developers`.
4. Click `Create new personal access token` or use an existing token. Copy the generated token and account ID and store them securely.

## Installation and Setup

1. **Install the Widget**: Find and install the Harvest Billing Widget from the Azure DevOps Marketplace.
2. **Add to Dashboard**: Drag and drop the widget onto your desired dashboard.
3. **Enter Configuration Details**: Provide your Harvest Account ID and Authorization Token to enable data fetching.
4. **Customize Display Options**: Select your preferred display mode, widget title, widget size, sector colors, and sector labels to visualize the data effectively.
5. **Customize Display**: Set your display preferences, widget dimensions, and optionally customize the R&D filter.

## Usage

After configuration, the widget provides a real-time breakdown of hours spent on different types of work. This allows teams and managers to monitor resource utilization and focus, ensuring that project hours are appropriately categorized and tracked.

For further assistance or detailed documentation, please visit [Harvest Billing Widget Documentation](https://github.com/EirEvo/AzureDevOpsExtensions).
