<script lang="ts">
	// Settings page
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
	
	<div class="space-y-4">
		<!-- Default Currency -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium text-gray-900">Default Currency</p>
					<p class="text-sm text-gray-500">Your primary currency for conversions</p>
				</div>
				<select class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
					<option value="TZS">TZS</option>
					<option value="KES">KES</option>
					<option value="USD">USD</option>
				</select>
			</div>
		</div>
		
		<!-- Save History -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium text-gray-900">Save Conversion History</p>
					<p class="text-sm text-gray-500">Keep track of your past conversions</p>
				</div>
				<button aria-label="Toggle save history" class="w-12 h-7 bg-emerald-500 rounded-full relative transition-colors">
					<span class="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform"></span>
				</button>
			</div>
		</div>
		
		<!-- Clear History -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium text-gray-900">Clear History</p>
					<p class="text-sm text-gray-500">Remove all saved conversions</p>
				</div>
				<button class="px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors">
					Clear
				</button>
			</div>
		</div>
		
		<!-- About -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<p class="font-medium text-gray-900 mb-2">About</p>
			<p class="text-sm text-gray-500">Exchange.tz v1.0.0</p>
			<p class="text-sm text-gray-500 mt-1">Quick currency conversions for TZS & KES</p>
		</div>
	</div>
</div>
